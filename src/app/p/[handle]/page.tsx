import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getProducts,
  STORE_NAME,
  cleanCategoryHandle,
  Product,
} from "@/lib/medusa";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDetailsClient } from "@/components/ProductDetailsClient";
import { ProductAccordions } from "@/components/ProductAccordions";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: STORE_NAME,
    };
  }

  const rawDesc =
    product.description ||
    `Shop ${product.title} at ${STORE_NAME}. Cash on delivery.`;
  const description = rawDesc.slice(0, 160);
  const ogImages = product.thumbnail ? [product.thumbnail] : [];

  return {
    title: `${product.title} | ${STORE_NAME}`,
    description,
    openGraph: {
      title: `${product.title} | ${STORE_NAME}`,
      description,
      images: ogImages,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const primaryCategory = product.categories?.[0];

  // Images for gallery
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.thumbnail
      ? [{ id: "thumb", url: product.thumbnail }]
      : [];

  // "You may also like" row: up to 4 other products of the first category
  let relatedProducts: Product[] = [];
  if (primaryCategory?.id) {
    try {
      const categoryProducts = await getProducts({
        category_id: primaryCategory.id,
        limit: 5,
      });
      relatedProducts = categoryProducts
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    } catch (err) {
      console.error("Failed to fetch related products:", err);
    }
  }

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-aura-gray">
          <Link href="/" className="hover:text-ink transition-colors">
            HOME
          </Link>{" "}
          /{" "}
          {primaryCategory ? (
            <>
              <Link
                href={`/c/${cleanCategoryHandle(primaryCategory.handle)}`}
                className="hover:text-ink transition-colors"
              >
                {primaryCategory.name.toUpperCase()}
              </Link>{" "}
              /{" "}
            </>
          ) : (
            <>
              <Link href="/shop" className="hover:text-ink transition-colors">
                SHOP
              </Link>{" "}
              /{" "}
            </>
          )}
          <span className="text-ink">{product.title}</span>
        </p>
      </nav>

      {/* ── Main Product Grid (Left: Gallery & Accordions; Right: Purchase Module) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Gallery & Accordions */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <ProductGallery images={images} title={product.title} />
          <ProductAccordions description={product.description} />
        </div>

        {/* Right Column: Sticky Purchase Details */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
          <div>
            {primaryCategory && (
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-aura-gray mb-1">
                {primaryCategory.name}
              </p>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-medium leading-tight text-ink mb-2">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="text-xs text-aura-gray mb-3">{product.subtitle}</p>
            )}
          </div>

          <ProductDetailsClient product={product} />
        </div>
      </div>

      {/* ── Related Products Row ── */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 mt-16 border-t border-line" aria-label="Related products">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-ink">
              YOU MAY ALSO LIKE
            </h2>
            {primaryCategory && (
              <Link
                href={`/c/${cleanCategoryHandle(primaryCategory.handle)}`}
                className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-aura-gray hover:text-ink transition-colors group"
              >
                <span>EXPLORE ALL</span>
                <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
