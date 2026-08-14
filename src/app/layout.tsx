import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adan Adeel | AI Engineer & Full-Stack Developer Portfolio",
  description:
    "Personal portfolio of Adan Adeel - CS Undergrad (Expected 2029) & Aspiring AI Engineer from Pakistan specializing in MERN Stack, WebSockets, PostgreSQL, and DevOps.",
  keywords: [
    "Adan Adeel",
    "adanadeel7",
    "AI Engineer",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "DevOps Engineer",
    "HyperCode",
    "Pakistan CS Student",
  ],
  authors: [{ name: "Adan Adeel" }],
  openGraph: {
    title: "Adan Adeel | AI Engineer & Full-Stack Developer",
    description:
      "Building real-time collaborative platforms, intelligent AI systems, and resilient DevOps pipelines.",
    url: "https://github.com/adanadeel7",
    siteName: "Adan Adeel Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased bg-[#0B080C] text-gray-300 selection:bg-[#6D28D9] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
