import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Ship Mute",
  description: "Ship Mute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
