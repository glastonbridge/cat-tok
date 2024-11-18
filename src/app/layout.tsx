import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UiStateWrapper } from "./ui-state-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cat-Tok",
  description: "The greatest way to upload and look at cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UiStateWrapper>
        <div className="body-container">
        {children}
        </div>
        </UiStateWrapper>
      </body>
    </html>
  );
}
