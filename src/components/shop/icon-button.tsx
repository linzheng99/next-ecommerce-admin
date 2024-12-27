"use client"

import { cn } from "@/lib/utils"

interface IconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  icon: React.ReactNode
  className?: string
}
export default function IconButton({ onClick, icon, className }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  )
};

