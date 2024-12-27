import Link from "next/link";

import { getCategories } from "@/features/categories/queries";

import MainNav from "./main-nav";
import NavbarActions from "./navbar-actions";

export default async function Navbar() {
  const categories = await getCategories({ storeId: process.env.NEXT_PUBLIC_STORE_ID! })

  return (
    <header className="bg-background border-b">
      <div className="flex px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2 font-bold">
            <Link href="/shop">STORE</Link>
          </div>
          <MainNav categories={categories} />
        </div>
        <NavbarActions />
      </div>
    </header>
  )
}
