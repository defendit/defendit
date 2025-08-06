"use client";
import { useEffect } from "react";
import { useStoredLocation, setStoredLocation } from "./useStoredLocation";

export const supportedCities: Record<string, string> = {
  ocala: "/services/ocala",
  belleview: "/services/belleview",
  "the villages": "/services/the-villages",
};

export const useDetectLocation = () => {
  const stored = useStoredLocation();

  useEffect(() => {
    const detectAndStoreLocation = async () => {
      if (typeof window === "undefined") return;

      if (stored) return;

      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await res.json();
        const city = data.city?.toLowerCase().trim();

        if (city && supportedCities[city]) {
          setStoredLocation(city);
        }
      } catch (error) {
        console.warn("Geo detection failed:", error);
      }
    };

    detectAndStoreLocation();
  }, [stored]);
};
