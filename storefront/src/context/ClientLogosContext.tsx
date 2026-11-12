"use client";

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";
import { DEFAULT_CLIENT_LOGOS, ClientLogo } from "@/data/clientLogosData";

const STORAGE_KEY = "ibrahim_client_logos_v1";

interface ClientLogosContextType {
  logos: ClientLogo[];
  addLogo: (logoData: Omit<ClientLogo, "id">) => Promise<void>;
  deleteLogo: (id: string) => Promise<void>;
  resetLogos: () => void;
  refreshLogos: () => Promise<void>;
}

const ClientLogosContext = createContext<ClientLogosContextType | null>(null);

let memoryLogos: ClientLogo[] = DEFAULT_CLIENT_LOGOS;
let initialized = false;

function initLogosFromLocalStorage() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        memoryLogos = parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load client logos storage:", e);
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

function getSnapshot(): ClientLogo[] {
  initLogosFromLocalStorage();
  return memoryLogos;
}

function getServerSnapshot(): ClientLogo[] {
  return DEFAULT_CLIENT_LOGOS;
}

export function ClientLogosProvider({ children }: { children: React.ReactNode }) {
  const logos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveToStorage = useCallback((newLogos: ClientLogo[]) => {
    memoryLogos = newLogos;
    emitChange();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogos));
    } catch (e) {
      console.error("Failed to persist client logos data:", e);
    }
  }, []);

  const refreshLogos = useCallback(async () => {
    try {
      const res = await fetch("/api/logos");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveToStorage(json.data);
        }
      }
    } catch (err) {
      console.warn("Backend logos sync unavailable, using local cache:", err);
    }
  }, [saveToStorage]);

  useEffect(() => {
    refreshLogos();
  }, [refreshLogos]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          memoryLogos = JSON.parse(e.newValue);
          emitChange();
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addLogo = useCallback(async (logoData: Omit<ClientLogo, "id">) => {
    const newLogo: ClientLogo = {
      ...logoData,
      id: `logo-custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: Date.now(),
    };
    saveToStorage([newLogo, ...memoryLogos]);

    try {
      await fetch("/api/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logoData),
      });
    } catch (e) {
      console.error("Failed to sync logo to server DB:", e);
    }
  }, [saveToStorage]);

  const deleteLogo = useCallback(async (id: string) => {
    const updated = memoryLogos.filter((item) => item.id !== id);
    saveToStorage(updated);

    try {
      await fetch(`/api/logos?id=${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to sync logo deletion to server DB:", e);
    }
  }, [saveToStorage]);

  const resetLogos = useCallback(() => {
    saveToStorage(DEFAULT_CLIENT_LOGOS);
  }, [saveToStorage]);

  return (
    <ClientLogosContext.Provider
      value={{
        logos,
        addLogo,
        deleteLogo,
        resetLogos,
        refreshLogos,
      }}
    >
      {children}
    </ClientLogosContext.Provider>
  );
}

export function useClientLogos() {
  const context = useContext(ClientLogosContext);
  if (!context) {
    throw new Error("useClientLogos must be used within a ClientLogosProvider");
  }
  return context;
}
