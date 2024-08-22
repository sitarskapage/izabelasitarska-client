import handleFetchError from "./handleFetchError";

export const fetchData = async (path: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_API_URL}/${path}`
  );
  if (!response.ok) return handleFetchError(response.status);
  const data = await response.json();
  return data;
};
