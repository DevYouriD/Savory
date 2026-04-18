"use client"

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ThemeProvider} from "next-themes";
import React, {useEffect, useState} from "react";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <html lang="en" className={geistSans.variable}>
        <body className="antialiased min-h-screen flex font-sans">
        {mounted && (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 flex flex-col">
                        <div className="sticky top-0 z-50 flex items-center p-1">
                            <SidebarTrigger />
                        </div>
                        {children}
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        )}
        </body>
        </html>
    );
}
