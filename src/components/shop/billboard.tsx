import { type Billboard } from "@prisma/client";

interface BillboardProps {
  billboard: Billboard | null | undefined
}

export default function Billboard({ billboard }: BillboardProps) {

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
