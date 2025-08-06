"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supportedCities } from "./useDetectLocation"; // Import the supported cities from the detect location hook
import { getStoredLocation } from "./useStoredLocation";

export const useLocationRedirect = (shouldRedirect = true) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined" || !shouldRedirect) return;
    const stored = getStoredLocation(); // Get the stored location from session storage
    // Get the stored location
    if (stored && supportedCities[stored]) {
      router.replace(supportedCities[stored]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, shouldRedirect]);
};
