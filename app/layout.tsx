import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";
import { DrawerProvider } from "@/components/agent-drawer-context";
import { AgentDrawer } from "@/components/agent-drawer";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Monster Mortgage × Claude AI",
  description: "AI-powered tools for mortgage brokers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body suppressHydrationWarning className="h-full antialiased font-sans bg-background text-foreground">
        <DrawerProvider>
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
          <AgentDrawer />
        </DrawerProvider>
      </body>
    </html>
  );
}
