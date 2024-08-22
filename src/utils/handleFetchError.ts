export default function handleFetchError(code: number): void {
  let errorMessage: string;

  switch (code) {
    case 404:
      errorMessage = "Not found.";
      break;
    case 500:
      errorMessage = "Server error.";
      break;
    case 401:
      errorMessage = "Unauthorized.";
      break;
    case 403:
      errorMessage = "Forbidden.";
      break;
    case 429:
      errorMessage = "Too many requests. Please come back later.";
      break;
    default:
      errorMessage = "Error.";
  }

  throw new Error(errorMessage);
}
