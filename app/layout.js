import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CountryProvider } from "./context/CountryContext";
import Providers from "./Providers";
import Script from "next/script";

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
      <head>
      <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rx6yj05ssw");
          `}
        </Script>
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-CCMC80B1WE`}
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CCMC80B1WE');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P7XVDBP4');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "leqsms6w8c");
          `}
        </Script>

        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        ></Script>

        <Script id="recaptcha" strategy="afterInteractive">
          {`
            function onSubmit(token) {
              document.getElementById("demo-form").submit();
            }
          `}
        </Script>

        <Script type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Logisol Technologies",
            url: "https://logisol.tech/",
            logo: "https://logisol.tech/logisol-logo-nav.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-626-671-6483",
              contactType: "Customer Service",
              areaServed: "US",
              availableLanguage: ["English"],
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "USA",
            },
            sameAs: [
              "https://www.linkedin.com/company/logisol-technologies/",
              "https://www.facebook.com/logisol.tech/",
              "https://www.instagram.com/logisol.tech/",
            ],
          })}
        </Script>

        <Script
          type="text/javascript"
          strategy="afterInteractive"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        ></Script>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-black`}
      >
        {/* TrustBox script - loads early for Trustpilot widget (as per Trustpilot: in head or top of page) */}
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="beforeInteractive"
        />
        <CountryProvider>
          <Providers>{children}</Providers>
        </CountryProvider>
      </body>
    </html>
  );
}
