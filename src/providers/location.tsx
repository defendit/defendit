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

// providers/location.tsx (dropdown-only, no third‑party IP calls, default = the-villages, added remote)
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "stored-location";
export type CityKey = "ocala" | "belleview" | "the-villages" | "remote";

export const supportedCities: Record<CityKey, string> = {
  ocala: "/services/ocala",
  belleview: "/services/belleview",
  "the-villages": "/services/the-villages",
  remote: "/services/remote",
};

export const CITY_LABELS: Record<CityKey, string> = {
  ocala: "Ocala",
  belleview: "Belleview",
  "the-villages": "The Villages",
  remote: "Remote",
};

const CITY_ALIAS_INDEX: Record<string, CityKey> = {
  ocala: "ocala",
  belleview: "belleview",
  "the villages": "the-villages",
  "the-villages": "the-villages",
  remote: "remote",
};

function normalize(v?: string | null) {
  return (v || "").toLowerCase().trim();
}

function resolveCityKey(value: string | null): CityKey | null {
  const n = normalize(value);
  if (!n) return null;
  return CITY_ALIAS_INDEX[n] ?? null;
}

type LocationContextType = {
  location: CityKey | null;
  setLocation: (city: CityKey) => void;
  clearLocation: () => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
  clearLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<CityKey | null>(null);

  const setLocation = (city: CityKey) => {
    try {
      localStorage.setItem(STORAGE_KEY, city);
    } catch {}
    setLocationState(city);
  };

  const clearLocation = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setLocationState(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const qCity = url.searchParams.get("city");
    const qKey = qCity && resolveCityKey(qCity);
    if (qKey && supportedCities[qKey]) {
      setLocation(qKey);
      return;
    }

    try {
      const stored =
        (localStorage.getItem(STORAGE_KEY) as CityKey | null) || null;
      if (stored && supportedCities[stored]) {
        setLocationState(stored);
        return;
      }
    } catch {}

    // Default to the-villages if no prior selection
    setLocation("the-villages");
  }, []);

  const value = useMemo(
    () => ({ location, setLocation, clearLocation }),
    [location]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function LocationPicker({
  label = "Choose your city",
  showHelper = true,
  autoRedirect = false,
}: {
  label?: string;
  showHelper?: boolean;
  autoRedirect?: boolean;
}) {
  const { location, setLocation } = useLocation();

  const [pending, setPending] = useState<CityKey | "">(location || "");

  useEffect(() => {
    setPending(location || "");
  }, [location]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as CityKey;
    setPending(next);
    setLocation(next);
    if (autoRedirect) {
      try {
        const to = supportedCities[next];
        if (to) window.location.assign(to);
      } catch {}
    }
  };

  return (
    <div className="w-full max-w-sm">
      <label className="block text-sm font-medium mb-1" htmlFor="city-select">
        {label}
      </label>
      <select
        id="city-select"
        className="w-full rounded-2xl border p-2 shadow-sm"
        value={pending}
        onChange={onChange}
        aria-label={label}
      >
        <option value="" disabled>
          Select…
        </option>
        {(Object.keys(CITY_LABELS) as CityKey[]).map((key) => (
          <option key={key} value={key}>
            {CITY_LABELS[key]}
          </option>
        ))}
      </select>
      {showHelper && (
        <p className="mt-2 text-xs opacity-70">
          We don't auto-detect your location. Your choice is saved only on this
          device (localStorage) and never sent to any third party.
        </p>
      )}
    </div>
  );
}

export function LocationPromptBanner({
  className = "",
  title = "Select your city",
  description = "Choose the area we should tailor services for.",
}: {
  className?: string;
  title?: string;
  description?: string;
}) {
  const { location } = useLocation();

  if (location) return null;

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${className}`}
      role="region"
      aria-live="polite"
    >
      <h2 className="text-base font-semibold mb-1">{title}</h2>
      <p className="text-sm opacity-80 mb-3">{description}</p>
      <LocationPicker showHelper={false} />
    </div>
  );
}
