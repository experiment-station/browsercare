import type { Metadata } from "next";
import { gtAmerica, gtAmericaMono } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "browsercare",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          gtAmerica.variable,
          gtAmericaMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
