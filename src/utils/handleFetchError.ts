export default function handleFetchError(code: number): string {
  switch (code) {
    case 404:
      return "Not found.";
    case 500:
      return "Server error.";
    case 401:
      return "Unauthorized.";
    case 403:
      return "Forbidden.";
    case 429:
      return "Too many requests. Please come back later.";
    default:
      return "An unexpected error occurred.";
  }
}
