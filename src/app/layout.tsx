import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Email Themes",
    description: "Email Themes, is a web application that allows you to create and manage email templates.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

    return (
        <html lang="en">
            <body className={inter.className}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
