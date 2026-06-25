export type Category = {
  name: string;
  slug: string;
  description: string;
};

export const categories: Category[] = [
  {
    name: "Landscapes",
    slug: "landscapes",
    description: "Vermont ridgelines, lakes, fields, and long seasonal light.",
  },
  {
    name: "Wildlife",
    slug: "wildlife",
    description: "Animal studies and natural moments with personality.",
  },
  {
    name: "Vermont Scenes",
    slug: "vermont-scenes",
    description: "New England place, weather, farms, and small-town texture.",
  },
  {
    name: "Fine Art",
    slug: "fine-art",
    description: "Original paintings, drawings, and studio pieces.",
  },
  {
    name: "Pastel",
    slug: "pastel",
    description: "Soft color, handmade marks, and expressive surface.",
  },
  {
    name: "Oil on Canvas",
    slug: "oil-on-canvas",
    description: "Layered original paintings with rich color and texture.",
  },
  {
    name: "Watercolor",
    slug: "watercolor",
    description: "Light-filled washes, florals, and atmospheric studies.",
  },
  {
    name: "Photography",
    slug: "photography",
    description: "Print-ready images gathered from the public Zenfolio gallery.",
  },
];
