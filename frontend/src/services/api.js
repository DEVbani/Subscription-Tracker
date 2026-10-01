import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Backend integration will replace the demo auth/data layer.
// Example:
// api.post("/auth/login", { email, password });
// api.get("/auth/me");
// api.get("/subscriptions");