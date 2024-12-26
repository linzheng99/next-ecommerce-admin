import Link from "next/link";

import { getCategories } from "@/features/categories/queries";

export default async function MainNav() {
  const categories =  await getCategories(process.env.NEXT_PUBLIC_STORE_ID!)
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {categories.map((category) => (
        <Link href={`/shop/category/${category.id}`} key={category.id} className="text-sm font-medium transition-colors hover:text-black">
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
