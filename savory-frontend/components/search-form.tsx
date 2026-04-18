"use client"

import { Label } from "@/components/ui/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import React from "react"
import { useTranslation } from "@/lib/layout-translation/use-translation";

interface SearchFormProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchForm({ value, onChange }: SearchFormProps) {
  const { t } = useTranslation();
  return (
      <form>
        <SidebarGroup className="py-0 mt-3">
          <SidebarGroupContent className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <SidebarInput
                id="search"
                placeholder={t("searchForm.sidebarInput")}
                className="pl-8"
                value={value}
                onChange={onChange}
            />
            <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          </SidebarGroupContent>
        </SidebarGroup>
      </form>
  )
}