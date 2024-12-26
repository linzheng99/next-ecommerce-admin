import Link from "next/link";

import MainNav from "./main-nav";
import NavbarActions from "./navbar-actions";

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="flex px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2 font-bold">
            <Link href="/shop">STORE</Link>
          </div>
          <MainNav />
        </div>
        <NavbarActions />
      </div>
    </header>
  )
}
