"use client"

import * as React from "react"

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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Aperitif",
      url: "#",
      items: [
        {
          title: "Limoncello",
          url: "#",
        },
        {
          title: "Ouzo",
          url: "#",
        },
        {
          title: "Cognac",
          url: "#",
          isActive: false,
        },
      ],
    },
    {
      title: "Appetizers",
      url: "#",
      items: [
        {
          title: "Cold appetizers",
          url: "#",
        },
        {
          title: "Warm appetizers",
          url: "#",
        },
      ],
    },
    {
      title: "Main Courses",
      url: "#",
      items: [
        {
          title: "Grilled Chicken",
          url: "#",
        },
      ],
    },
    {
      title: "Deserts",
      url: "#",
      items: [
        {
          title: "Chocolate Cake",
          url: "#",
        },
        {
          title: "Tiramisu",
          url: "#",
        },
      ],
    },
    {
      title: "Cocktails",
      url: "#",
      items: [
        {
          title: "Mojito",
          url: "#",
        },
      ],
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
            defaultOpen
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
