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

"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const STORAGE_KEY = "stored-location";

export const supportedCities: Record<string, string> = {
  ocala: "/services/ocala",
  belleview: "/services/belleview",
  "the villages": "/services/the-villages",
};

type LocationContextType = {
  location: string | null;
  setLocation: (city: string) => void;
};

const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<string | null>(null);

  const setLocation = (city: string) => {
    localStorage.setItem(STORAGE_KEY, city);
    setLocationState(city);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLocationState(stored);
      return;
    }

    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        const city = data.city?.toLowerCase().trim();

        if (city && supportedCities[city]) {
          setLocation(city);
        }
      } catch (err) {
        console.warn("Geo detection failed:", err);
      }
    };

    detectLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
