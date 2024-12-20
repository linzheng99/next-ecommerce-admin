import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import StoreIdClient from "./client"


export default async function StoreIdPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return <StoreIdClient />
}
