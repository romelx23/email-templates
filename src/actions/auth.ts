// "use server";

// import { cookies } from "next/headers"; // Importa la API de cookies de Next.js
// import apiClient from "@/api/apiClient";

// export const loginServer = async (accessToken: string) => {
//   try {
//     // Enviar el token al servidor para validarlo
//     const response = await apiClient.post("/auth/google", {
//       id_token: accessToken,
//     });

//     if (!response.data.access_token) {
//       throw new Error("Failed to log in with Google");
//     }

//     const data = response.data;
//     console.log("Login successful:", data);

//     // Obtener el objeto de cookies
//     const cookieStore = cookies();

//     // Establecer el token en la cookie
//     cookieStore.set("access_token", data.access_token, {
//       httpOnly: true, // Importante: hacer que la cookie no sea accesible desde JavaScript del cliente
//       secure: process.env.NODE_ENV === "production", // Solo transmitir cookies en HTTPS
//       sameSite: "strict", // Evitar el envío de cookies en solicitudes de otros dominios
//       path: "/", // Establecer la cookie en todo el sitio
//     });

//     cookieStore.set("user", JSON.stringify(data.user), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     // Aquí puedes manejar lo que se debe hacer con el login, por ejemplo, guardar el token en la sesión
//     // o retornar los datos del usuario para manejarlo en el cliente

//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//   }
// };

// export const getSession = async () => {
//   try {
//     // // Obtener el token de la cookie
//     // const accessToken = cookies().get("access_token")?.value;

//     // // Enviar el token al servidor para obtener la sesión
//     // const response = await apiClient.post("/auth/renew", {
//     //   token: accessToken,
//     // });

//     // if (!response.data.access_token) {
//     //   throw new Error("Failed to renew session");
//     // }

//     // const data = response.data;
//     // console.log("Session renewed:", data);

//     // // Actualizar la cookie con el nuevo token
//     // cookies().set("access_token", data.access_token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === "production",
//     //   sameSite: "strict",
//     // });

//     // obtener los datos del usuario de las cookies
//     const user = cookies().get("user")?.value;

//     // retornar los datos del usuario

//     return user ? JSON.parse(user) : null;
//   } catch (error) {
//     console.error("Session error:", error);
//     return null;
//   }
// };
