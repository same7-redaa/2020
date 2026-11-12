"use client";

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";
import { DEFAULT_CONTACT_SETTINGS, ContactSettings } from "@/types/contactSettings";

const STORAGE_KEY = "ibrahim_contact_settings_v1";

interface ContactSettingsContextType {
  settings: ContactSettings;
  updateSettings: (newSettings: Partial<ContactSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  getWhatsAppUrl: (message?: string) => string;
}

const ContactSettingsContext = createContext<ContactSettingsContextType | null>(null);

let memorySettings: ContactSettings = DEFAULT_CONTACT_SETTINGS;
let initialized = false;

function initSettingsFromLocalStorage() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        memorySettings = { ...DEFAULT_CONTACT_SETTINGS, ...parsed };
      }
    }
  } catch (e) {
    console.error("Failed to load contact settings storage:", e);
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

function getSnapshot(): ContactSettings {
  initSettingsFromLocalStorage();
  return memorySettings;
}

function getServerSnapshot(): ContactSettings {
  return DEFAULT_CONTACT_SETTINGS;
}

export function ContactSettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveToStorage = useCallback((newSettings: ContactSettings) => {
    memorySettings = newSettings;
    emitChange();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error("Failed to persist contact settings:", e);
    }
  }, []);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          saveToStorage({ ...DEFAULT_CONTACT_SETTINGS, ...json.data });
        }
      }
    } catch (err) {
      console.warn("Backend settings sync unavailable, using local cache:", err);
    }
  }, [saveToStorage]);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          memorySettings = { ...DEFAULT_CONTACT_SETTINGS, ...JSON.parse(e.newValue) };
          emitChange();
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<ContactSettings>) => {
    const updated = {
      ...memorySettings,
      ...newSettings,
    };
    saveToStorage(updated);

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.error("Failed to sync settings to server DB:", e);
    }
  }, [saveToStorage]);

  const resetSettings = useCallback(async () => {
    saveToStorage(DEFAULT_CONTACT_SETTINGS);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_CONTACT_SETTINGS),
      });
    } catch (e) {
      console.error("Failed to reset settings on server:", e);
    }
  }, [saveToStorage]);

  const getWhatsAppUrl = useCallback((message?: string) => {
    const num = (settings.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp).replace(/[^0-9]/g, "");
    return `https://wa.me/${num}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  }, [settings.whatsapp]);

  return (
    <ContactSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        refreshSettings,
        getWhatsAppUrl,
      }}
    >
      {children}
    </ContactSettingsContext.Provider>
  );
}

export function useContactSettings() {
  const context = useContext(ContactSettingsContext);
  if (!context) {
    throw new Error("useContactSettings must be used within a ContactSettingsProvider");
  }
  return context;
}
