import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header/Header";
import { SanityLive } from "@/sanity/lib/live";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reddish",
  description: "Reddish",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch subreddits data on the server
  const subreddits = await getSubreddits();
  
  // Transform the data to match the Header component's expected format
  const subredditsData = subreddits?.filter(sub => sub.slug !== null).map(sub => ({
    title: sub.title || "unknown",
    slug: sub.slug!
  }));

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header subreddits={subredditsData} />
          <div className="flex flex-col">{children}</div>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}