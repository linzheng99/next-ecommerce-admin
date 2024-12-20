import { UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import MainNav from "@/components/main-nav"
import StoreSwitch from "@/features/stores/components/store-switch"

export default async function Navbar() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="flex items-center justify-between border-b p-4 gap-4">
      <StoreSwitch />
      <MainNav />
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  )
}

