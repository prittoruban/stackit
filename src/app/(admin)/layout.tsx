import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StackIt Admin Panel",
  description: "StackIt Admin Panel for managing content and settings.",
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
