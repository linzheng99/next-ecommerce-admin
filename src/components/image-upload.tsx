import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"
import { useEffect, useState } from "react"

import { Button } from "./ui/button"

interface ImageUploadProps {
  disabled?: boolean
  onRemove: (url: string) => void
  onChange: (url: string) => void
  value: string[]
}

export const ImageUpload = ({
  disabled,
  onRemove,
  onChange,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onUpload(result: any) {
    onChange(result.info.secure_url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="absolute top-2 right-2 z-10">
              <Button
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={(result) => {
          onUpload(result);
        }}
        uploadPreset="ecommerce-admin"
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              variant="secondary"
              onClick={() => open?.()}
              disabled={disabled}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
