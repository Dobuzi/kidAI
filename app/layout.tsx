import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "kidAI",
  description: "어린이를 위한 AI 학습 도우미"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
