import type { Metadata } from "next";
import { gtAmerica, gtAmericaMono } from "./fonts";
import "./globals.css";

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
        className={`font-sans antialiased ${gtAmerica.variable} ${gtAmericaMono.variable}`}
      >
        <main className="max-w-7xl min-h-screen mx-auto px-6 py-6 sm:px-8 flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
