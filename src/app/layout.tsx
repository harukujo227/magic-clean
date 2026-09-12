import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Magic Clean | House & Office Cleaning in Cambridgeshire & Huntingdonshire",
    template: "%s | Magic Clean",
  },
  description:
    "Magic Clean — professional house and office cleaning across Cambridgeshire and Huntingdonshire. DBS checked, friendly service, free quotes.",
  metadataBase: new URL("https://magiccleaning.local"),
  openGraph: {
    title: "Magic Clean",
    description:
      "Professional house and office cleaning across Cambridgeshire and Huntingdonshire.",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${outfit.variable} ${syne.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
