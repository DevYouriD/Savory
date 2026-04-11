"use client"

import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {ThemeProvider} from "next-themes";
import React, {useEffect, useState} from "react";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

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
        <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex`}>
        {mounted && (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 flex flex-col">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </ThemeProvider>
        )}
        </body>
        </html>
    );
}
