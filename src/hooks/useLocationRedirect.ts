"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const supportedCities: Record<string, string> = {
  ocala: "/services/ocala",
  belleview: "/services/belleview",
  "the villages": "/services/the-villages",
};

export const useLocationRedirect = (shouldRedirect = true) => {
  const router = useRouter();

  useEffect(() => {
    const checkLocation = async () => {
      // Avoid SSR or rechecking if already stored
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem("userRegion");
      if (stored && supportedCities[stored]) {
        if (shouldRedirect) router.replace(supportedCities[stored]);
        return;
      }

      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
        const data = await res.json();
        const city = data.city?.toLowerCase().trim();

        console.log("Detected city:", city);

        if (city && supportedCities[city]) {
          localStorage.setItem("userRegion", city);
          if (shouldRedirect) router.replace(supportedCities[city]);
        }
      } catch (error) {
        console.warn("Geo detection failed:", error);
      }
    };

    checkLocation();
  }, [router, shouldRedirect]);
};
