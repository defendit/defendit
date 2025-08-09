/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

// providers/location.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "stored-location";

// canonical city keys
export type CityKey = "ocala" | "belleview" | "the-villages";

// where each city key should redirect
export const supportedCities: Record<CityKey, string> = {
  ocala: "/services/ocala",
  belleview: "/services/belleview",
  "the-villages": "/services/the-villages",
};

// neighbor/alias mapping -> canonical city key
const CITY_FALLBACK_MAP: Record<CityKey, string[]> = {
  ocala: [
    "Ocala",
    "Silver Springs",
    "Silver Springs Shores",
    "Marion Oaks",
    "Dunnellon",
    "Reddick",
    "Citra",
    "Anthony",
    "Fort McCoy",
    "McIntosh",
    "Lowell",
    "Zuber",
    "Flemington",
  ],
  belleview: [
    "Belleview",
    "Summerfield",
    "Pedro",
    "Oxford",
    "Lake Weir",
    "Ocklawaha",
    "Weirsdale",
  ],
  "the-villages": [
    "The Villages",
    "Lady Lake",
    "Fruitland Park",
    "Wildwood",
    "Leesburg",
    "Coleman",
  ],
};

// fast lookup set
const CITY_ALIAS_INDEX: Record<string, CityKey> = (() => {
  const idx: Record<string, CityKey> = {};
  (Object.keys(CITY_FALLBACK_MAP) as CityKey[]).forEach((key) => {
    CITY_FALLBACK_MAP[key].forEach((n) => (idx[n.toLowerCase()] = key));
  });
  // include canonical spellings too
  idx["ocala"] = "ocala";
  idx["belleview"] = "belleview";
  idx["the villages"] = "the-villages";
  idx["the-villages"] = "the-villages";
  return idx;
})();

function normalize(s?: string | null) {
  return (s || "").toLowerCase().trim();
}

function resolveCityKey(cityName: string | null): CityKey | null {
  const n = normalize(cityName);
  if (!n) return null;
  return CITY_ALIAS_INDEX[n] ?? null;
}

async function fetchWithTimeout(url: string, ms = 2000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

type LocationContextType = {
  location: CityKey | null; // canonical key or null
  setLocation: (city: CityKey) => void; // manual override (persisted)
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocationState] = useState<CityKey | null>(null);

  const setLocation = (city: CityKey) => {
    localStorage.setItem(STORAGE_KEY, city);
    setLocationState(city);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1) query override ?city=ocala|belleview|the-villages
    const url = new URL(window.location.href);
    const qCity = url.searchParams.get("city");
    const qKey = qCity && resolveCityKey(qCity);
    if (qKey && supportedCities[qKey]) {
      setLocation(qKey);
      return;
    }

    // 2) stored
    const stored = localStorage.getItem(STORAGE_KEY) as CityKey | null;
    if (stored && supportedCities[stored]) {
      setLocationState(stored);
      return;
    }

    // 3) detect via IP (two providers with timeouts)
    (async () => {
      try {
        // provider A
        const a = await fetchWithTimeout("https://ipwho.is/", 2000);
        const aKey = resolveCityKey(a?.city);
        if (aKey) return setLocation(aKey);

        // provider B (fallback)
        const b = await fetchWithTimeout("https://ipapi.co/json/", 2000);
        const bKey = resolveCityKey(b?.city);
        if (bKey) return setLocation(bKey);
      } catch {
        // ignore detection errors
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
