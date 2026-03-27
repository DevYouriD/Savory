"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AppBreadcrumbProps {
    recipeTitle?: string;
}

export function AppBreadcrumb({ recipeTitle }: AppBreadcrumbProps) {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const buildHref = (index: number) => {
        return "/" + segments.slice(0, index + 1).join("/");
    };

    const isObjectId = (s: string) => /^[a-f0-9]{24}$/.test(s);

    function getLabel(segment: string, recipeTitle?: string) {
        console.log(/^\d+$/.test(segment));

        if (isObjectId(segment) && recipeTitle) return recipeTitle;
        if (segment === "recipe-details") return "Recipes";
        if (segment === "edit") return "Edit";
        return segment;
    }


    return (
        <Breadcrumb>
            <BreadcrumbList>

                {/* Home */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;

                    // Make this segment non-clickable
                    const isDisabled = segment === "recipe-details";

                    const label = getLabel(segment, recipeTitle);

                    return (
                        <span key={index} className="flex items-center gap-1">
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                {isLast || isDisabled ? (
                                    <BreadcrumbPage>{label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={buildHref(index)}>
                                            {label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </span>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}