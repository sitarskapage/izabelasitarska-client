import { ReactNode, useState, useEffect } from "react";
import { GeneralContext, Preferences } from "../GeneralContext";
import handleFetchError from "../../utils/handleFetchError";

interface GeneralProviderProps {
  children: ReactNode;
}

export const GeneralProvider: React.FC<GeneralProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        if (!import.meta.env.VITE_SERVER_API_URL) {
          return console.error("VITE_SERVER_API_URL not found");
        }

        const input = import.meta.env.VITE_SERVER_API_URL + "/preferences";
        const response = await fetch(input);

        if (response.ok) {
          const data = await response.json();
          setPreferences(data);
          setLoading(false);
          document.body.className = "";
        } else {
          setStatus(response.status);
        }
      } catch {
        return;
      }
    };

    // call
    init();
  }, []);

  const Child = () => {
    if (status) {
      return <p>{"Error: " + handleFetchError(status)}</p>;
    } else {
      return children;
    }
  };
  return (
    <GeneralContext.Provider
      value={{ preferences, setPreferences, loading, setLoading }}
    >
      <Child />
    </GeneralContext.Provider>
  );
};
