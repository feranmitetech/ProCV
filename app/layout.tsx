import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProCV - AI CV Builder for Nigerian Professionals",
  description: "Build a professional CV in minutes. AI rewrites your experience into strong bullet points. Pay NGN 1,500 and download your PDF.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
