"use client";

import * as React from "react";
import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CaretRightIcon } from "@phosphor-icons/react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { getAllRecipes } from "@/lib/queries";

const categories = [
  "APERITIEF",
  "VOORGERECHT",
  "HOOFDGERECHT",
  "NAGERECHT",
  "SNACK",
  "ONTBIJT",
  "BAKKEN",
  "SAUS",
  "DRINKEN",
  "COCKTAIL",
  "OVERIGE",
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [recipesByCategory, setRecipesByCategory] = React.useState<Record<string, any[]>>({});
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    async function fetchRecipes() {
      const allRecipes = await getAllRecipes();

      // Group recipes by category
      const grouped: Record<string, any[]> = {};
      categories.forEach((cat) => (grouped[cat] = []));
      allRecipes.forEach((recipe) => {
        if (grouped[recipe.category]) {
          grouped[recipe.category].push(recipe);
        } else {
          grouped["OVERIGE"].push(recipe);
        }
      });

      setRecipesByCategory(grouped);
    }

    fetchRecipes();
  }, []);

  // Filter for search input
  const filterItems = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
      <Sidebar {...props}>
        <SidebarHeader>
          <SearchForm
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>

        <SidebarContent className="gap-0">
          {categories.map((cat) => {
            const displayName = cat === "OVERIGE" ? "Overige" : cat.charAt(0) + cat.slice(1).toLowerCase();
            const items = filterItems(recipesByCategory[cat] || []);

            return (
                <Collapsible key={cat} title={displayName} className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel
                        asChild
                        className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <CollapsibleTrigger>
                        {displayName}{" "}
                        <CaretRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {items.map((item) => (
                              <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton asChild>
                                  <Link href={`/recipe-details/${item.id}`}>{item.title}</Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
            );
          })}

          <div className="mt-auto px-4 py-4 flex flex-col gap-4">
            <Link
                href="/create-recipe"
                className="bg-green-800 text-white text-center px-4 py-2 rounded hover:bg-green-700 transition"
            >
              + Create New Recipe
            </Link>

            <ModeToggle />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
  );
}