import type { ItemConnection } from "@/types/itinerary";

interface ConnectionIndicatorProps {
  connection: ItemConnection;
}

// Icon mapping for connection modes
function ConnectionIcon({ mode }: { mode: ItemConnection["mode"] }) {
  switch (mode) {
    case "walk":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5d6472"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          <path d="M13 21v-4l-3-3 1.5-5L13 11l2-6" />
          <path d="m8 17 6-1.5" />
        </svg>
      );
    case "metro":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5d6472"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6M9 15h6" />
        </svg>
      );
    case "taxi":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5d6472"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 17h2l.64-2.55c.16-.65-.09-1.32-.65-1.67l-2.99-1.94A3 3 0 0 0 16.28 10H7.72a3 3 0 0 0-1.72.84L3.01 12.78c-.56.35-.81 1.02-.65 1.67L3 17h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "bus":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5d6472"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 6v6M16 6v6M2 12h20M4.5 17.5h15" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>
      );
    default:
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5d6472"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
  }
}

export function ConnectionIndicator({ connection }: ConnectionIndicatorProps) {
  const { distanceKm, durationMin, mode } = connection;

  // Format distance text
  const distanceText = distanceKm
    ? distanceKm < 1
      ? `${Math.round(distanceKm * 1000)}m`
      : `${distanceKm.toFixed(1)} km`
    : null;

  // Format duration text
  const durationText = durationMin
    ? durationMin < 60
      ? `${durationMin} min`
      : `${Math.round(durationMin / 60)} hr`
    : null;

  // Combine texts
  const displayText = [distanceText, durationText].filter(Boolean).join(" · ");

  return (
    <div className="flex gap-[16px] py-[8px]">
      {/* Vertical connector line with icon */}
      <div className="flex w-[97px] flex-col items-center">
        <div className="h-[20px] w-0 border-l border-[#ededed]" />
        <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#ededed]">
          <ConnectionIcon mode={mode} />
        </div>
        <div className="h-[20px] w-0 border-l border-[#ededed]" />
      </div>

      {/* Distance/duration pill */}
      {displayText && (
        <div className="flex items-center">
          <div className="rounded-[20px] bg-[#ededed] px-[10px] py-[5px]">
            <p className="font-body text-[12px] text-[#5d6472]">{displayText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
