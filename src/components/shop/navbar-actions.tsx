import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NavbarActions() {
  return (
    <div className="flex items-center gap-x-4 ml-auto">
      <Button className="flex items-center gap-x-2" size="sm" variant="default">
        <ShoppingBag className="w-4 h-4" />
        <span className="text-sm font-medium">Cart</span>
      </Button>
    </div>
  )
}
