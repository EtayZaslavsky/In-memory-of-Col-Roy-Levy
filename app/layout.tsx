import "../styles.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "../lib/utils";
import { Metadata } from "next";
import client from "../tina/__generated__/client";
import localFont from 'next/font/local';

const felix = localFont({
  src: [
    {
      path: '../public/fonts/felix.woff',
      weight: '500',
      style: 'normal',
    },
  ],

  variable: '--font-felix',
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
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

  const selectFont = (fontName: string) => {
    switch (fontName) {
      case "nunito":
        return `font-nunito ${nunito.variable}`;
      case "felix":
        return `font-felix ${felix.variable}`;
      case "lato":
        return `font-lato ${lato.variable}`;
      case "sans":
      default:
        return `font-sans ${fontSans.variable} `;
    }
  };
  // const fontVariable = selectFont(global?.theme?.font || "sans");
  const fontVariable = "felix";

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={cn("min-h-screen flex flex-col antialiased dark", fontVariable)}
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
