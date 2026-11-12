"use client";

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";
import { PORTFOLIO_DATA, GalleryProject } from "@/data/portfolioData";

const STORAGE_KEY = "ibrahim_portfolio_gallery_v1";

interface PortfolioContextType {
  data: Record<string, GalleryProject[]>;
  getProjects: (categorySlug: string) => GalleryProject[];
  getFeaturedProjects: (categorySlug: string) => GalleryProject[];
  addProject: (categorySlug: string, project: Omit<GalleryProject, "id" | "category">) => Promise<void>;
  updateProject: (categorySlug: string, project: GalleryProject) => Promise<void>;
  toggleFeaturedProject: (categorySlug: string, projectId: string) => Promise<void>;
  deleteProject: (categorySlug: string, projectId: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  refreshFromBackend: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function getInitialGalleryData(): Record<string, GalleryProject[]> {
  const initial: Record<string, GalleryProject[]> = {};
  Object.keys(PORTFOLIO_DATA).forEach((key) => {
    initial[key] = PORTFOLIO_DATA[key].galleryProjects || [];
  });
  return initial;
}

// In-memory cache for fast sync
let memoryStore: Record<string, GalleryProject[]> = getInitialGalleryData();
let initialized = false;

function initStoreFromLocalStorage() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      memoryStore = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load portfolio storage:", e);
  }
}

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Record<string, GalleryProject[]> {
  initStoreFromLocalStorage();
  return memoryStore;
}

function getServerSnapshot(): Record<string, GalleryProject[]> {
  return getInitialGalleryData();
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const storeData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveToStorage = useCallback((newData: Record<string, GalleryProject[]>) => {
    memoryStore = newData;
    emitChange();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to persist portfolio data to localStorage:", e);
    }
  }, []);

  const refreshFromBackend = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveToStorage(json.data);
        }
      }
    } catch (err) {
      console.warn("Backend portfolio sync unavailable, using local cache:", err);
    }
  }, [saveToStorage]);

  // Sync from backend on initial mount
  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  // Sync with other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          memoryStore = JSON.parse(e.newValue);
          emitChange();
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getProjects = useCallback((categorySlug: string): GalleryProject[] => {
    if (storeData && storeData[categorySlug] !== undefined) {
      return storeData[categorySlug];
    }
    return PORTFOLIO_DATA[categorySlug]?.galleryProjects || [];
  }, [storeData]);

  const getFeaturedProjects = useCallback((categorySlug: string): GalleryProject[] => {
    const all = getProjects(categorySlug);
    const featured = all.filter((p) => p.isFeaturedInCoverflow);
    return featured.length > 0 ? featured : all;
  }, [getProjects]);

  const addProject = useCallback(async (categorySlug: string, projectData: Omit<GalleryProject, "id" | "category">) => {
    const categoryName = PORTFOLIO_DATA[categorySlug]?.categoryName || categorySlug;
    const newProject: GalleryProject = {
      ...projectData,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      category: categoryName,
    };

    const currentList = memoryStore[categorySlug] || [];
    const updatedData = {
      ...memoryStore,
      [categorySlug]: [newProject, ...currentList],
    };
    saveToStorage(updatedData);

    // Persist to server backend API
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorySlug, project: newProject }),
      });
    } catch (e) {
      console.error("Failed to sync new project to server DB:", e);
    }
  }, [saveToStorage]);

  const updateProject = useCallback(async (categorySlug: string, updatedProject: GalleryProject) => {
    const currentList = memoryStore[categorySlug] || [];
    const updatedData = {
      ...memoryStore,
      [categorySlug]: currentList.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    };
    saveToStorage(updatedData);

    // Persist to server backend API
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorySlug, project: updatedProject }),
      });
    } catch (e) {
      console.error("Failed to sync project update to server DB:", e);
    }
  }, [saveToStorage]);

  const toggleFeaturedProject = useCallback(async (categorySlug: string, projectId: string) => {
    const currentList = memoryStore[categorySlug] || [];
    const target = currentList.find((p) => p.id === projectId);
    if (!target) return;
    const updated = {
      ...target,
      isFeaturedInCoverflow: !target.isFeaturedInCoverflow,
    };
    await updateProject(categorySlug, updated);
  }, [updateProject]);

  const deleteProject = useCallback(async (categorySlug: string, projectId: string) => {
    const currentList = memoryStore[categorySlug] || [];
    const updatedData = {
      ...memoryStore,
      [categorySlug]: currentList.filter((p) => p.id !== projectId),
    };
    saveToStorage(updatedData);

    // Persist deletion to server backend API
    try {
      await fetch(`/api/portfolio?category=${categorySlug}&id=${projectId}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to sync project deletion to server DB:", e);
    }
  }, [saveToStorage]);

  const resetToDefaults = useCallback(async () => {
    const initial = getInitialGalleryData();
    saveToStorage(initial);

    try {
      await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
    } catch (e) {
      console.error("Failed to reset portfolio DB on server:", e);
    }
  }, [saveToStorage]);

  return (
    <PortfolioContext.Provider
      value={{
        data: storeData,
        getProjects,
        getFeaturedProjects,
        addProject,
        updateProject,
        toggleFeaturedProject,
        deleteProject,
        resetToDefaults,
        refreshFromBackend,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

// YouTube URL parser utility
export function parseYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(url?: string): string | null {
  const id = parseYouTubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
}

export function getYouTubeThumbnailUrl(url?: string): string | null {
  const id = parseYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}
