import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CountryProvider } from "./context/CountryContext";
import Providers from "./Providers";
import SilkBackgroundWrapper from "./Components/UI/SilkBackgroundWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Logisol Technologies | Web, App & Marketing Experts",
  description: "Logisol Technologies is a software development company that provides software development services to businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* TrustBox script - loads early for Trustpilot widget (as per Trustpilot: in head or top of page) */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="beforeInteractive"
        />
        {/* Silk Background - covers entire website */}
        <SilkBackgroundWrapper />
        <CountryProvider>
          <Providers>{children}</Providers>
        </CountryProvider>
      </body>
    </html>
  );
}
