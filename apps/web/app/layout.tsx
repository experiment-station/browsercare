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
    <html
      lang="en"
      className={`${gtAmerica.variable} ${gtAmericaMono.variable}`}
    >
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>{children}</body>
    </html>
  );
}
