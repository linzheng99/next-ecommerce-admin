"use client"

import { type Billboard as BillboardType, type Category, type Color, type Size } from '@prisma/client';
import { useEffect, useState } from 'react';

import Billboard from '@/components/shop/billboard';
import Filter from '@/components/shop/filter';
import FilterProduct from '@/components/shop/filter-product';
import MobileFilters from '@/components/shop/mobile-filters';

interface CategoryIdClientProps {
  category: Category & { billboard: BillboardType | null } | null
  sizes: Size[]
  colors: Color[]
}

export default function CategoryIdClient({ category, sizes, colors }: CategoryIdClientProps) {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="flex flex-col">
      {category && <Billboard billboard={category.billboard} />}
      <div className='px-4 sm:px-6 lg:px-8 pb-24'>
        <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
          <MobileFilters colors={colors} sizes={sizes} />
          <div className='hidden lg:block'>
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
          <div className='mt-6 lg:col-span-4 lg:mt-0'>
            <FilterProduct categoryId={category?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
