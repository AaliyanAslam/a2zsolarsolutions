import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const font = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
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
      className={`${font.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <body
        className="min-h-full flex flex-col bg-white text-gray-900 overflow-x-hidden w-full relative"
        suppressHydrationWarning
      >
        <Navbar />
        <div className="flex-1 w-full overflow-x-hidden">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
