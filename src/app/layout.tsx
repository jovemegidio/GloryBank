import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GloryBank — Internet Banking Digital",
    template: "%s | GloryBank",
  },
  description:
    "GloryBank — Internet Banking digital completo. PIX instantâneo, boletos, transferências e gestão financeira com segurança AES-256.",
  keywords: ["internet banking", "pix", "boleto", "transferência", "banco digital"],
  themeColor: "#e30613",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  manifest: undefined,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f6f8] text-slate-800">{children}</body>
    </html>
  );
}
