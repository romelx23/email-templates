// import apiClient from "@/api/apiClient";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// const protectedRoutes = ["/dashboard"];
// const publicRoutes = ["/auth/login", "/auth/register"];

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const accessToken = req.cookies.get("access_token")?.value;

//   try {
//     // Verifica el token renovando la sesión
//     const { data } = await apiClient.post("/auth/renew", {
//       token: accessToken,
//     });

//     if (!data || !data.user) {
//       throw new Error("Token inválido");
//     }

//     cookies().set("access_token", data.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     // asignar el usuario a la sesión

//     cookies().set("user", JSON.stringify(data.user), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     // Si el token es válido y la ruta es pública, redirige al dashboard
//     if (isPublicRoute) {
//       console.log("Redirigiendo al dashboard");
//       return NextResponse.rewrite(new URL("/dashboard", req.url));
//     }

//     // Si el token es válido y la ruta es protegida, continúa
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error al renovar el token:", error);

//     // Si no hay token válido y la ruta es protegida, redirige al login
//     if (isProtectedRoute) {
//       console.log("Redirigiendo al login");
//       return NextResponse.rewrite(new URL("/auth/login", req.url));
//     }

//     // Si es una ruta pública, permite el acceso sin autenticación
//     return NextResponse.next();
//   }
// }
