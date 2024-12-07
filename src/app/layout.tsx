import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';

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
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
