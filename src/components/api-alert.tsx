import { Copy, Server } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Badge, type BadgeProps } from "./ui/badge"
import { Button } from "./ui/button"

interface ApiAlertProps {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
}

const variantColorMap: Record<ApiAlertProps["variant"], BadgeProps['variant']> = {
  public: "secondary",
  admin: "destructive",
}

export default function ApiAlert({
  title,
  description,
  variant = "public"
}: ApiAlertProps) {
  const onCopy = async () => {
    await navigator.clipboard.writeText(description)
    toast.success("Copied to clipboard")
  }


  return (
    <Alert className="">
      <div className="flex items-center gap-x-2">
        <AlertTitle className="flex items-center gap-x-2">
          <Server className="h-4 w-4" />
          {title}
          <Badge variant={variantColorMap[variant]}>
            {textMap[variant]}
          </Badge>
        </AlertTitle>
      </div>
      <AlertDescription className="flex items-center justify-between gap-x-2 ml-5">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.7rem] font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
};
