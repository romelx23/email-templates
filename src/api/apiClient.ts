import axios from "axios";
// import { cookies } from "next/headers";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Verifica si estamos en el cliente
    const token = localStorage.getItem("x-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    // Si no estamos en el cliente, intentamos leer las cookies
    // const parsedCookies = cookies().get("access_token");
    // const token = parsedCookies || "";
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
  }

  return config;
});

export default apiClient;
