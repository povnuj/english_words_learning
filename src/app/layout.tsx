import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./theme/theme";
import StoreProvider from "@/store/StoreProvider";
import NavBar from "./components/Nav/NavBar";

export const metadata: Metadata = {
  title: "Learn English",
  description: "Learn English words with Domana cards. Exist testing mode and 3 ways to learning",
  
  openGraph: {
    title: 'Learn English',
    description: 'Learn English words with Domana cards. Exist testing mode and 3 ways to learning',
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <StoreProvider>
            <NavBar />
              {children}
          </StoreProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
