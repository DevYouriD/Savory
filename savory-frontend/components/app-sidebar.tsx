"use client"

import * as React from "react"
import Link from "next/link";

import {SearchForm} from "@/components/search-form"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"
import {CaretRightIcon} from "@phosphor-icons/react"
import {ModeToggle} from "@/components/ui/mode-toggle";

const data = {
  navMain: [
    {
      title: "Aperitief",
      url: "#",
      items: [],
    },
    {
      title: "Voorgerechten",
      url: "#",
      items: [],
    },
    {
      title: "Hoofdgerechten",
      url: "#",
      items: [],
    },
    {
      title: "Nagerechten",
      url: "#",
      items: [
        {
          title: "Tiramisu",
          url: "#",
          // isActive: true,
        },
      ],
    },
    {
      title: "Snacks",
      url: "#",
      items: [],
    },
    {
      title: "Ontbijt",
      url: "#",
      items: [],
    },
    {
      title: "Bakken",
      url: "#",
      items: [],
    },
    {
      title: "Saus",
      url: "#",
      items: [],
    },
    {
      title: "Drinken",
      url: "#",
      items: [],
    },
    {
      title: "Cocktails",
      url: "#",
      items: [],
    },
    {
      title: "Anders",
      url: "#",
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            // defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <CaretRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
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
  )
}
