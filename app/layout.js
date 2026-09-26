import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "A 2 Z Solar Solutions | Affordable Solar Energy Systems",
  description:
    "A 2 Z Solar Solutions provides premium solar panel installations, energy consultations, and affordable solar systems for homes and businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#E9E9E9]" suppressHydrationWarning>
        <Navbar />
        {/* Spacer to offset fixed navbar height */}
        <div className="pt-16 sm:pt-18" />
        {children}
      </body>
    </html>
  );
}
