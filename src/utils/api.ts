export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5066/api";

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Retrieve token from local storage if available (we will implement Auth storage in Phase 4)
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("ely_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ely_token");
      localStorage.removeItem("ely_user");
      window.location.href = "/login";
      // Return a pending promise to prevent subsequent code execution during page unload
      return new Promise(() => {});
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
