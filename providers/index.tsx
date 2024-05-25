"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  return (
      <NextThemesProvider enableColorScheme enableSystem attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
  )
}