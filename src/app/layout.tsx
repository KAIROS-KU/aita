import localFont from "next/font/local";
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "고려대학교 강의 보조 도구",
  description: "강의와 학습을 더 쉽고 빠르게!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-W7DFNHQ6R8" />
    </html>
  );
}
