"use client";

import ThemeProvider from "@/Providers/ThemeProvider";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning  >
      <body>
        <ThemeProvider >
        <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>  
      </body>
    </html>
  );
}
