export type Review = {
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  context: string;
};

export const demoReviews: Review[] = [
  {
    name: "Sarah M.",
    location: "Stowe, VT",
    rating: 5,
    date: "Demo review",
    context: "Fine art print",
    text: "Christine's Vermont landscape print brought so much warmth into our home. The piece feels personal, calm, and beautifully made.",
  },
  {
    name: "Daniel R.",
    location: "Burlington, VT",
    rating: 5,
    date: "Demo review",
    context: "Original artwork inquiry",
    text: "The process felt thoughtful from the first message. Christine helped us understand the piece, sizing, and framing without making anything feel rushed.",
  },
  {
    name: "Megan L.",
    location: "Cambridge, VT",
    rating: 5,
    date: "Demo review",
    context: "Gift order",
    text: "I ordered a print as a gift and loved how connected it felt to Vermont. The artwork has that quiet, handmade feeling that makes it special.",
  },
];
