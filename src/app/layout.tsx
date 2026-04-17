import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prince Digital Academy - Smart Learning, Real Results",
    template: "%s | Prince Digital Academy",
  },
  description:
    "Quality online education for JHS, SHS, and beyond. Join thousands of students learning from expert teachers across Ghana.",
  keywords: [
    "online learning",
    "Ghana education",
    "JHS courses",
    "SHS courses",
    "WASSCE preparation",
    "Prince Digital Academy",
  ],
  authors: [{ name: "Prince Digital Academy" }],
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Prince Digital Academy",
    title: "Prince Digital Academy - Smart Learning, Real Results",
    description:
      "Quality online education for JHS, SHS, and beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
