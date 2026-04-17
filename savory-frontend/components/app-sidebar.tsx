"use client";

import * as React from "react";
import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  useSidebar,
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
import { getTranslator } from "@/lib/i18n";

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
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({});
  const { isMobile, setOpenMobile } = useSidebar();
  const t = getTranslator("nl");

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

      // Initialize openCategories to false
      const initialOpen: Record<string, boolean> = {};
      categories.forEach((cat) => (initialOpen[cat] = false));
      setOpenCategories(initialOpen);
    }

    fetchRecipes();
  }, []);

  // Filter items by search query
  const filterItems = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  React.useEffect(() => {
    if (!searchQuery) {
      // Close all tabs when search-bar is clear
      const closed: Record<string, boolean> = {};
      categories.forEach((cat) => (closed[cat] = false));
      setOpenCategories(closed);
      return;
    }

    // Only open matching categories when searching
    const newOpen: Record<string, boolean> = {};
    categories.forEach((cat) => {
      const items = filterItems(recipesByCategory[cat] || []);
      newOpen[cat] = items.length > 0;
    });
    setOpenCategories(newOpen);
  }, [searchQuery, recipesByCategory]);

  return (
      <Sidebar {...props}>
        <SidebarHeader>
          <SearchForm
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </SidebarHeader>

        <SidebarContent className="flex flex-col h-full">

          {/* CATEGORIES */}
          <div className="flex-1 overflow-auto">
            {categories.map((cat) => {
              const displayName =
                  cat === "OVERIGE" ? "Overige" : cat.charAt(0) + cat.slice(1).toLowerCase();

              const items = filterItems(recipesByCategory[cat] || []);

              return (
                  <Collapsible
                      key={cat}
                      open={openCategories[cat]}
                      onOpenChange={(isOpen) =>
                          setOpenCategories((prev) => ({ ...prev, [cat]: isOpen }))
                      }
                      className="group/collapsible"
                  >
                    <SidebarGroup>
                      <SidebarGroupLabel
                          asChild
                          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <CollapsibleTrigger>
                          {displayName}
                          <CaretRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                      </SidebarGroupLabel>

                      <CollapsibleContent>
                        <SidebarGroupContent>
                          <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                  <SidebarMenuButton asChild className="items-start h-auto whitespace-normal">
                                    <Link
                                        href={`/recipe-details/${item.id}`}
                                        onClick={() => {
                                          if (isMobile) {
                                            setTimeout(() => setOpenMobile(false), 80);
                                          }
                                        }}
                                        className="block w-full whitespace-normal break-words">
                                      {item.title}
                                    </Link>
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
          </div>

          {/* FOOTER */}
          <div className="shrink-0 px-4 py-4 flex flex-col gap-4 bg-sidebar border-t border-sidebar-border">
            <Link
                href="/create-recipe"
                className="bg-green-800 text-white text-center px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {t("sidebar.newRecipeButton")}
            </Link>

            <ModeToggle />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
  );
}