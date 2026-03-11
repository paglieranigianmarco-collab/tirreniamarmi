export type MaterialCategory =
  | "marble"
  | "quartzite"
  | "granite"
  | "onyx"
  | "stone"
  | "travertine";

export type Finish = "cannettato" | "rigato" | "spazzolato" | "polished" | "honed";

export interface Material {
  slug: string;
  name: string;
  nameIt: string;
  category: MaterialCategory;
  origin: string;
  description: string;
  descriptionIt: string;
  image: string;
  finishes: Finish[];
  uses: string[];
  usesIt: string[];
  exclusive?: boolean;
}
