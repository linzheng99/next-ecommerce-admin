"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useStoreId } from "@/hooks/use-store-id"
import { cn } from "@/lib/utils"

export default function MainNav() {
  const pathname = usePathname()
  const storeId = useStoreId()

  const routes = [
    {
      href: `/stores/${storeId}`,
      label: "Overview",
      active: pathname === `/stores/${storeId}`,
    },
    {
      href: `/stores/${storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/stores/${storeId}/billboards`,
    },
    {
      href: `/stores/${storeId}/categories`,
      label: "Categories",
      active: pathname === `/stores/${storeId}/categories`,
    },
    {
      href: `/stores/${storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/stores/${storeId}/sizes`,
    },
    {
      href: `/stores/${storeId}/colors`,
      label: "Colors",
      active: pathname === `/stores/${storeId}/colors`,
    },
    {
      href: `/stores/${storeId}/products`,
      label: "Products",
      active: pathname === `/stores/${storeId}/products`,
    },
    {
      href: `/stores/${storeId}/settings`,
      label: "Settings",
      active: pathname === `/stores/${storeId}/settings`,
    },
  ]

  return (
    <div className="flex items-center gap-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}

