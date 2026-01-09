import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "China Travel Planner | First Trip Made Simple",
  description: "Stop browsing. Start deciding. A smarter way to plan your first trip to China.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
