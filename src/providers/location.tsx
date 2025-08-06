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
