"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocation, supportedCities } from "@/providers/location";

export const useLocationRedirect = (shouldRedirect = true) => {
  const router = useRouter();
  const { location } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !shouldRedirect) return;
    // Get the stored location
    if (location && supportedCities[location]) {
      router.replace(supportedCities[location]);
    }
  }, [router, shouldRedirect, location]);
};
