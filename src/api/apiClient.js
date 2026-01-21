// src/api/apiClient.js

const BASE_URL = "http://projectdetails.runasp.net"; // তোমার domain

export async function apiRequest(path, { method = "GET", body } = {}) {
  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && data.message) ||
      (typeof data === "string" ? data : "") ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export const apiGet = (path) => apiRequest(path);
export const apiPost = (path, body) => apiRequest(path, { method: "POST", body });
export const apiPut = (path, body) => apiRequest(path, { method: "PUT", body });
export const apiDelete = (path) => apiRequest(path, { method: "DELETE" });
