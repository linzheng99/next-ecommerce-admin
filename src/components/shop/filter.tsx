'use client'

import { type Color, type Size } from "@prisma/client"

import { cn } from "@/lib/utils"
import { useCategoryFilter } from "@/store/use-category-filter"

import { Button } from "../ui/button"

interface FilterProps {
  valueKey: string
  name: string
  data: (Color[] | Size[]) | null
}

export default function Filter({ valueKey, name, data }: FilterProps) {
  const { values, setValue } = useCategoryFilter()

  return (
    <div className="flex flex-col mb-8">
      <h3 className='text-lg font-semibold'>{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data?.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            className={cn(`
              rounded-md text-sm
            `, values[valueKey] === item.id && 'bg-black text-white')}
            onClick={() => {
              setValue(item.id, valueKey)
            }}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
