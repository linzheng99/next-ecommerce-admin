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

