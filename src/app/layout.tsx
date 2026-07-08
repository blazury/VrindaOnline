import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vrnda | Premium Natural Food, Dining & Sustainable Livelihood",
  description: "Experience Vrnda's curated organic food products, cafe & dining experiences, retail storefront, and industry internship programs for sustainable development.",
  keywords: ["Vrnda", "premium food products", "restaurant", "cafe", "retail", "e-commerce", "internship program", "sustainable living"],
  authors: [{ name: "Shailesh's Studio" }],
  openGraph: {
    title: "Vrnda | Premium Natural Food & Dining",
    description: "Curated organic food products, dining experiences, and internships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-transparent">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
