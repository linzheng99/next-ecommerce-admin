import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { getStoresByUserId } from "@/features/stores/queries"


export default async function SetupPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const stores = await getStoresByUserId({ userId })

  if (stores.length === 0) {
    redirect('/stores/create')
  } else {
    const store = stores[0]
    if (!store) redirect('/stores/create')
    redirect(`/stores/${store.id}`)
  }
};
