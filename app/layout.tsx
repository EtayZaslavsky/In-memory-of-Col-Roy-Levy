import "../styles.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { cn } from "../lib/utils";
import { Metadata } from "next";
import client from "../tina/__generated__/client";
import localFont from 'next/font/local';

const felix = localFont({
  src: '../public/fonts/felix.woff'
});

// export const metadata: Metadata = {
//   title: "רועי לוי",
//   description: "Tina Cloud Starter",
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });
  const global = globalQuery.data.global;

  const fontVariable = "felix";

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={cn("min-h-screen flex flex-col antialiased dark", felix.className)}
        style={{ fontFamily: "felix !important" }} // fontFamily
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          forcedTheme={global?.theme?.darkMode ? "dark" : "light"}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
