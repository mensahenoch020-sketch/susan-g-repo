import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/lib/site-config";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Mobile Food Service in Southfield, MI`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "mobile food service",
    "food truck Southfield Michigan",
    "Oakland County catering",
    "prepared meals Southfield",
    "event food service Michigan",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Mobile Food Service in Southfield, MI`,
    description: siteConfig.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Mobile Food Service`,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.businessName,
    legalName: siteConfig.legalName,
    description: siteConfig.shortDescription,
    email: siteConfig.email,
    telephone: siteConfig.phoneRaw,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.stateAbbr,
      addressCountry: "US",
    },
    areaServed: siteConfig.serviceArea,
    servesCuisine: "American",
    priceRange: "$$",
    foundingDate: "2021-12",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
