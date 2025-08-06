"use client";
import { useState, useEffect } from "react";

export const useStoredLocation = (): string | null => {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = getStoredLocation();
    if (stored) {
      setLocation(stored);
    }
  }, []);

  return location;
};

export const getStoredLocation = (): string | null => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("userRegion");
  }
  return null;
};

export const setStoredLocation = (location: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("userRegion", location);
  }
};
