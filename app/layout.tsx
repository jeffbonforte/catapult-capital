import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catapult Capital",
  description: "Patient capital for durable, founder-led businesses in the lower middle market.",
  icons: {
    icon: "/assets/catapult-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
