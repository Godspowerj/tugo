import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/src/context/authContext";
import { UIProvider } from "@/src/context/UIContext";
import { ProfileProvider } from "@/src/context/ProfileContext";
import { HomeProvider } from "@/src/context/HomeContext";
import { PostProvider } from "@/src/context/PostContext";

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
    default: "Tugo | Find Your Perfect Roommate & Student Housing",
    template: "%s | Tugo"
  },
  description: "The ultimate social platform for students to connect with compatible roommates, find affordable housing, and discover campus businesses.",
  keywords: ["student housing", "roommate finder", "university accommodation", "campus life", "student marketplace"],
  authors: [{ name: "Tugo Team" }],
  creator: "Tugo",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://tugo.ng",
    title: "Tugo | Find Your Perfect Roommate",
    description: "Connect with compatible roommates and find affordable student housing near your university.",
    siteName: "Tugo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tugo - Student Housing & Roommates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tugo | Student Housing Simplified",
    description: "Find roommates and housing near your campus easily.",
    creator: "@tugo_ng",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <UIProvider>
            <ProfileProvider>
              <HomeProvider>
                <PostProvider>
                  {children}
                  <Toaster richColors position="top-right" />
                </PostProvider>
              </HomeProvider>
            </ProfileProvider>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

