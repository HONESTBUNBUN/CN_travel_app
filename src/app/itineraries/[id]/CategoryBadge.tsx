import type { ItemCategory } from "@/types/itinerary";

interface CategoryBadgeProps {
  category: ItemCategory;
}

// Category badge styles matching Figma design specifications
const categoryStyles: Record<ItemCategory, { text: string; bg: string; label: string }> = {
  transport: {
    text: "#1fc16b",
    bg: "rgba(132, 235, 180, 0.2)",
    label: "Transport",
  },
  attraction: {
    text: "#ff5c02",
    bg: "rgba(255, 201, 171, 0.2)",
    label: "Attraction",
  },
  food: {
    text: "#dfb400",
    bg: "rgba(255, 219, 67, 0.2)",
    label: "Food",
  },
  shopping: {
    text: "#3c00c6",
    bg: "rgba(196, 170, 255, 0.5)",
    label: "Shop",
  },
  accommodation: {
    text: "#0066cc",
    bg: "rgba(102, 178, 255, 0.2)",
    label: "Stay",
  },
  activity: {
    text: "#ff5c02",
    bg: "rgba(255, 201, 171, 0.2)",
    label: "Activity",
  },
  rest: {
    text: "#8c909a",
    bg: "rgba(140, 144, 154, 0.2)",
    label: "Rest",
  },
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = categoryStyles[category];

  return (
    <div
      className="inline-flex items-center rounded-[4px] px-[8px] py-[4px]"
      style={{
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      <span className="font-body text-[12px] font-medium leading-none">
        {style.label}
      </span>
    </div>
  );
}
