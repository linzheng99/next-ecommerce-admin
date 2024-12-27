'use client'

import { type Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface MainNavProps {
  categories: Category[]
}

export default function MainNav({ categories }: MainNavProps) {
  const pathname = usePathname()

  const routes = categories.map((category) => ({
    href: `/shop/category/${category.id}`,
    label: category.name,
    active: pathname === `/shop/category/${category.id}`,
  }))

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link href={route.href} key={route.href} className={cn("text-sm font-medium transition-colors hover:text-black", route.active ? "text-black" : "text-muted-foreground")}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
