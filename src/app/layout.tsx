import type { Metadata } from "next";
import { Faculty_Glyphic, Work_Sans, Crimson_Text } from "next/font/google";
import "./globals.css";

const facultyGlyphic = Faculty_Glyphic({
  variable: "--font-faculty-glyphic",
  subsets: ["latin"],
  weight: ["400"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Christ Church Bellingham",
  description:
    "Christ Church Bellingham — a Reformed church in Bellingham, Washington",
  icons: {
    icon: "/favicon-cropped.png",
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
      className={`${facultyGlyphic.variable} ${workSans.variable} ${crimsonText.variable}`}
    >
      <body className="antialiased">

        {children}
      </body>
    </html>
  );
}
