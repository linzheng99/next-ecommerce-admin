import ApiAlert from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import { useStoreId } from "@/hooks/use-store-id";

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const origin = useOrigin()
  const storeId = useStoreId()
  
  return (
    <>
      <ApiAlert
        title="GET"
        description={`${origin}/api/${entityName}/?storeId=${storeId}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${origin}/api/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  )
}
