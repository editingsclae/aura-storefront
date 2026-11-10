import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { CategoryTile, cleanCategoryHandle } from "@/logic";
import { CATEGORY_TILE_PLACES } from "@/lib/declare-layout";

interface CategoryTilesProps {
  tiles: CategoryTile[];
}

export function CategoryTiles({ tiles: allTiles }: CategoryTilesProps) {
  const tiles = allTiles.slice(0, CATEGORY_TILE_PLACES);
  if (tiles.length === 0) return null;

  return (
    <div className="max-w-[1240px] mx-auto px-6">
      <div className="bg-white rounded-[6px] shadow-[0_14px_40px_rgba(60,50,35,0.09)] -mt-[34px] relative z-20 py-[26px] px-2 flex flex-wrap sm:flex-nowrap items-center border border-line/40">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={`/c/${cleanCategoryHandle(tile.handle)}`}
            className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
          >
            {tile.image_url ? (
              <span className="relative block w-[30px] h-[30px] overflow-hidden rounded-full shrink-0">
                <Image
                  src={tile.image_url}
                  alt=""
                  fill
                  sizes="30px"
                  className="object-cover"
                />
              </span>
            ) : (
              <Sparkles className="w-[28px] h-[28px] text-ink stroke-[1.4]" />
            )}
            <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-ink">
              {tile.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
