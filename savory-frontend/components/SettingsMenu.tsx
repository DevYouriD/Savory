"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Settings } from "lucide-react";

export function SettingsMenu() {
    const router = useRouter();

    function setLanguage(lang: "nl" | "en") {
        document.cookie = `language=${lang}; path=/`;
        router.refresh();
    }

    return (
        <DropdownMenu>
            {/* GEAR BUTTON */}
            <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer" variant="outline" size="icon">
                    <Settings className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Settings</span>
                </Button>
            </DropdownMenuTrigger>

            {/* MENU */}
            <DropdownMenuContent align="end" className="w-40 space-y-1">

                {/* THEME */}
                <div className="flex justify-center px-2 py-1 mt-1">
                    <ModeToggle />
                </div>

                <div className="h-px bg-border my-1" />

                {/* LANGUAGE */}
                <DropdownMenuItem onClick={() => setLanguage("nl")}
                                  className="text-base py-2 cursor-pointer"
                >
                    🇳🇱 Nederlands
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setLanguage("en")}
                                  className="text-base py-2 cursor-pointer"
                >
                    🇬🇧 English
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}