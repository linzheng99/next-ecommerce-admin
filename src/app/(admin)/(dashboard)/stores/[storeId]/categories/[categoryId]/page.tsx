"use client"

import { useCategoryId } from "@/hooks/use-category-id";

import { CategoryIdClient } from "./client";

export default function CategoryIdPage() {
  const categoryId = useCategoryId()
  return <CategoryIdClient categoryId={categoryId} />
}
