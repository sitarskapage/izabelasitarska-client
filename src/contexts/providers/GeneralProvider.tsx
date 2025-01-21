import { ReactNode, useState, useMemo, useEffect } from "react";
import LoadingPage from "../../pages/Loading";
import { GeneralContext, Preferences } from "../GeneralContext";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);

  const fetchPreferences = useMemo(() => {
    const fetchPreferencesFromServer = async () => {
      const endpoint = "/preferences";
      const apiUrl = import.meta.env.VITE_SERVER_API_URL + endpoint;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok && response.status === 429) {
          setStatus(429);
        } else if (!response.ok) {
          throw new Error(`Error fetching preferences: ${response.statusText}`);
        }
        const data = await response.json();
        setPreferences(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
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
      {loading ? (
        <LoadingPage />
      ) : status === 429 ? (
        <p className="font-monospace">
          You have been timed-out. Please try again later.
        </p>
      ) : (
        children
      )}
    </GeneralContext.Provider>
  );
};
