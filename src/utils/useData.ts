import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../contexts/GeneralContext";

export function useData<T>(endpoint: string) {
  const context = useContext(GeneralContext);
  const { setLoading } = context;
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_API_URL + endpoint
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, setLoading]);

  return data;
}
