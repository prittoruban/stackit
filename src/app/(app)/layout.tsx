import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stackit",
  description:
    "Stack your posts, comments, and discussions in a Reddit-like platform built with Next.js and Sanity.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch subreddits data on the server
  const subreddits = await getSubreddits();

  // Transform the data to match the Header component's expected format
  const subredditsData = subreddits
    ?.filter((sub) => sub.slug !== null)
    .map((sub) => ({
      title: sub.title || "unknown",
      slug: sub.slug!,
    }));

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="image.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header subreddits={subredditsData} />
          <div className="flex flex-col">{children}</div>
          <Footer />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
