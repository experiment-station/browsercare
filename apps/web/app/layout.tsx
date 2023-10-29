import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Container, Theme } from "@radix-ui/themes";

import { gtAmerica, gtAmericaMono } from "./fonts";
import "./style.css";

export const metadata: Metadata = {
  description: "",
  title: "browsercare",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${gtAmerica.variable} ${gtAmericaMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <link href="/favicon.ico" rel="icon" sizes="any" />

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Theme
            accentColor="mint"
            grayColor="gray"
            radius="medium"
            scaling="100%"
          >
            <Header />
            <Container
              my="6"
              px={{
                initial: "6",
                lg: "0",
              }}
            >
              {children}
            </Container>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
