import { supabase } from "./supabase.js";

/**
 * apiFetch - Fetch wrapper with automatic authentication
 *
 * @param {string} path - The API path (e.g., '/api/threads' or '/api/threads/123')
 * @param {RequestInit} options - Standard fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} - The fetch Response object
 */
export async function apiFetch(path, options = {}) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const url = `${apiUrl}${path}`;


  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;


  const headers = {
    ...options.headers, 
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }


  return fetch(url, {
    ...options,
    headers,
  });
}
