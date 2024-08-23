import {
  ImageRefSchema,
  PreferencesSchema,
  UrlSchema,
  VideoRefSchema,
} from "@jakubkanna/labguy-front-schema";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";

interface Preferences extends PreferencesSchema {
  homepage_background_image?: ImageRefSchema[];
  homepage_background_video?: VideoRefSchema[];
  homepage_urls: UrlSchema[];
}

interface GeneralContextType {
  preferences: Preferences | null;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralContext = createContext<GeneralContextType>({
  preferences: null,
  setPreferences: () => {},
  loading: true,
  setLoading: () => {},
});

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPreferences = useMemo(() => {
    const fetchPreferencesFromServer = async () => {
      const endpoint = "/preferences";
      const apiUrl = import.meta.env.VITE_SERVER_API_URL + endpoint;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error fetching preferences: ${response.statusText}`);
        }
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    return fetchPreferencesFromServer;
  }, []);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  return (
    <GeneralContext.Provider
      value={{ preferences, setPreferences, loading, setLoading }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
