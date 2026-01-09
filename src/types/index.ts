// User Input Types (from onboarding)
export type TravelPace = "slow" | "balanced" | "fast";
export type PlanningEffort = "low" | "medium" | "high";
export type WeatherFlexibility = "flexible" | "somewhat" | "comfort-focused";

export interface Interest {
  id: string;
  label: string;
  emoji: string;
}

export interface UserInputs {
  isFirstTimer: boolean;
  interests: string[]; // Array of interest IDs (max 5)
  tripLength: number; // Days
  tripDates?: {
    // Optional if calendar picker used
    start: Date;
    end: Date;
    season: "spring" | "summer" | "fall" | "winter";
  };
  pace: TravelPace;
  planningEffort: PlanningEffort;
  weatherFlexibility: WeatherFlexibility;
}

// Destination Types
export interface Destination {
  id: string;
  name: string;
  slug: string;
  tags: string[]; // 2-3 suitability tags
  shortDescription: string; // One-line description
  heroImage: string;

  // Detail content
  whyPeopleLike: string;
  bestTimeToVisit: {
    seasons: string[];
    explanation: string;
  };
  whyThisFits: (inputs: UserInputs) => string; // Dynamic based on inputs
  goodToKnow: string[]; // 2-3 constraints/trade-offs

  // Matching criteria (for recommendation logic)
  matchingInterests: string[];
  suitablePace: TravelPace[];
  minimumDays: number;
  weatherSensitive: boolean;

  // Geographic data for routing
  latitude?: number;
  longitude?: number;
  region?: string; // e.g., "North", "Central", "South", "West"
}

// Itinerary Types
export interface CityStop {
  cityId: string;
  destination: Destination;
  nights: number;
  role: string; // "adaptation", "contrast", "nature", etc.
  roleExplanation: string;
}

export interface TransportConnection {
  from: string;
  to: string;
  mode: "high-speed-rail" | "flight" | "bus" | "ferry";
  duration: number; // minutes
  distance?: number; // kilometers
}

export interface ItineraryItem {
  category: "Transport" | "Attraction" | "Food" | "Shop" | "Rest";
  order: number;
  title: string;
  shortDescription: string;
  image: string;
  distance?: number; // km from previous item
  duration?: number; // minutes from previous item
}

export interface DayItinerary {
  dayNumber: number;
  city: string;
  theme: string; // Short label
  intent: string; // One sentence
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  route: string[]; // ["Beijing", "Xi'an", "Shanghai"]
  experiencePills: string[]; // ["Ancient", "Culture", "Nature"]
  totalDays: number;
  pace: TravelPace;

  // Detail content
  overview: string;
  stops: CityStop[];
  transportConnections: TransportConnection[];
  travelFlow: string;
  goodToKnow: string[];
  tradeoffs: string[]; // Explicit trade-offs
  whoIsBestFor: (inputs: UserInputs) => string;

  // Day-level breakdown
  days: DayItinerary[];

  // Matching criteria
  requiredInterests: string[]; // Must match at least 1
  optionalInterests?: string[];
  interestedDestinations: string[]; // Destination IDs user marked interested
  minDays: number;
  maxDays: number;
  suitablePace: TravelPace[];

  // Flags
  isCustomGenerated?: boolean; // True if algorithmically generated
}

// App State Types
export interface OnboardingState {
  currentStep: number;
  inputs: Partial<UserInputs>;
  completedSteps: number[];
}

export interface RecommendationState {
  currentDestinationIndex: number;
  interestedDestinations: string[];
  skippedDestinations: string[];
  viewedDestinations: string[];
}

// Constants
export const INTERESTS: Interest[] = [
  { id: "pandas", label: "Pandas", emoji: "🐼" },
  { id: "mountains", label: "Mountains", emoji: "⛰" },
  { id: "national-parks", label: "National parks", emoji: "🌲" },
  { id: "temples", label: "Temples", emoji: "🏯" },
  { id: "classical-gardens", label: "Classical gardens", emoji: "🪷" },
  { id: "ancient-cities", label: "Ancient cities", emoji: "🧱" },
  { id: "street-food", label: "Street food", emoji: "🌶" },
  { id: "regional-cuisine", label: "Regional cuisine", emoji: "🍲" },
  { id: "tea-culture", label: "Tea culture", emoji: "🫖" },
  { id: "city-skylines", label: "City skylines", emoji: "🌃" },
  { id: "night-markets", label: "Night markets", emoji: "🛍" },
  { id: "high-speed-trains", label: "High-speed trains", emoji: "🚄" },
];
