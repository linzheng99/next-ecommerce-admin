import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/shop" className="text-sm font-medium transition-colors hover:text-black">
        Home
      </Link>
    </nav>
  )
}
