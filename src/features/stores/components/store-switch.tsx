"use client"

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useStoreId } from "@/hooks/use-store-id"

import { useGetStores } from "../api/use-get-stores"
import { useStoreModal } from "../store/use-store-modal"

export default function StoreSwitch() {
  const router = useRouter()
  const storeId = useStoreId()
  
  const { onOpen } = useStoreModal()
  const { data: items } = useGetStores()

  const [open, setOpen] = useState(false)

  const currentStore = items?.find((store) => store.id === storeId)

  const handleSelect = (storeId: string) => {
    setOpen(false)
    router.push(`/stores/${storeId}`)
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select store"
          className="w-[200px] justify-between"
        >
          <StoreIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="truncate">{currentStore?.name ?? "Select store..."}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No store found.</CommandEmpty>
            {items?.length && (
              <CommandGroup>
                {items.map(({ id, name }) => (
                  <CommandItem
                    key={id}
                    value={id}
                    onSelect={() => handleSelect(id)}
                  >
                    {
                      storeId === id ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <StoreIcon className="mr-2 h-4 w-4 opacity-50" />
                      )
                    }
                    <span className="truncate">{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onOpen()
                setOpen(false)
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>

  )
}
