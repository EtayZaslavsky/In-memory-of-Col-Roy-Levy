import "../styles.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { cn } from "../lib/utils";
import { Metadata } from "next";
import client from "../tina/__generated__/client";
import localFont from 'next/font/local';
import Script from 'next/script';

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
  const GTAG_ID = "G-T9QLCT8VWW";
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>

      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
        `}
      </Script>

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
