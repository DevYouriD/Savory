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

export function AppBreadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const buildHref = (index: number) => {
        return "/" + segments.slice(0, index + 1).join("/");
    };

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

                    const label =
                        segment === "recipe-details"
                            ? "Recipes"
                            : segment === "edit"
                                ? "Edit"
                                : segment;

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