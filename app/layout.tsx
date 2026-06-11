import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { SiteChrome } from "@/components/header/SiteChrome";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased font-sans",
        inter.variable,
        playfair.variable,
        fontMono.variable
      )}
    >
      <body className="relative">
        {/* === Globaler Hintergrund-Verlauf (über die ganze Seite) ===== */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-white via-white to-light-beige-100/60"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed -top-24 -right-32 -z-10 h-[40rem] w-[40rem] rounded-full bg-light-beige-100/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed top-1/3 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-light-rose/40 blur-3xl"
        />

        <ThemeProvider>
          <SiteChrome header={<Header />} />
          {children}
          <SiteChrome footer={<Footer />} />
        </ThemeProvider>
      </body>
    </html>
  );
}
