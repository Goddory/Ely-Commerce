"use client";

import { Suspense } from "react";
import ProductsCatalog from "./ProductsCatalog";

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
