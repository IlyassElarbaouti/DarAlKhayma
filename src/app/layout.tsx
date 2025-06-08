import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://dar-al-khayma.com'),
  title: {
    default: "Dar Al Khayma - Discover Morocco's Finest Properties",
    template: "%s | Dar Al Khayma"
  },
  description: "Premium property rental platform featuring luxury accommodations across Morocco. Discover unique riads, villas, and apartments in Marrakech, Casablanca, Fez, and beyond.",
  keywords: [
    "Morocco", 
    "property rental", 
    "luxury accommodation", 
    "riads", 
    "villas", 
    "Marrakech", 
    "Casablanca", 
    "Fez",
    "Essaouira",
    "Chefchaouen",
    "vacation rental",
    "Moroccan hospitality",
    "traditional architecture",
    "premium stays"
  ],
  authors: [{ name: "Dar Al Khayma" }],
  creator: "Dar Al Khayma",
  publisher: "Dar Al Khayma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dar Al Khayma - Discover Morocco's Finest Properties",
    description: "Premium property rental platform featuring luxury accommodations across Morocco.",
    type: "website",
    locale: "en_US",
    url: "https://dar-al-khayma.com",
    siteName: "Dar Al Khayma",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dar Al Khayma - Morocco's Premier Property Rental Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dar Al Khayma - Discover Morocco's Finest Properties",
    description: "Premium property rental platform featuring luxury accommodations across Morocco.",
    creator: "@daralkhayma",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://dar-al-khayma.com",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        className={`${inter.className} antialiased min-h-screen bg-white text-neutral-800`}
      >
        {children}
      </body>
    </html>
  );
}
