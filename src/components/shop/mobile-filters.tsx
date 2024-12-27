'use client'

import { type Color, type Size } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "../ui/button"
import Filter from "./filter"


interface MobileFiltersProps {
  colors: Color[]
  sizes: Size[]
}

export default function MobileFilters({ colors, sizes }: MobileFiltersProps) {
  const [open, setOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="lg:hidden block">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="default">
            <span className="ml-2">Filters</span>
            <PlusIcon className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Filter
              valueKey='sizeId'
              name='Sizes'
              data={sizes}
            />
            <Filter
              valueKey='colorId'
              name='Colors'
              data={colors}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
