import { getBillboard } from "@/features/billboards/queries";

export default async function Billboard() {
  const billboard = await getBillboard({ 
    storeId: process.env.NEXT_PUBLIC_STORE_ID!, 
    billboardId: '598522f2-33bb-4d59-95ce-5917b82141a4' 
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div 
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden"
        style={{ backgroundImage: `url(${billboard?.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {billboard?.label}
          </h1>
        </div>
      </div>
    </div>
  )
}
