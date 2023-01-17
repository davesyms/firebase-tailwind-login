"use client"
import "../styles/globals.css";
import { AuthProvider } from "../context/authContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <AuthProvider>
                <body>{children}</body>
            </AuthProvider>
        </html>
    );
}
