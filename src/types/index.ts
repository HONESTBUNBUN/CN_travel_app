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

// Dataset Types (PRD v1.3)
export type PrimaryCluster = "urban_modern" | "historical_cultural" | "natural_scenic" | "rural_traditional";
export type TransportHubTier = "major" | "regional" | "remote";
export type Season = "spring" | "summer" | "fall" | "winter";
export type WeatherRiskLevel = "low" | "moderate" | "high";
export type CrowdLevel = "low" | "moderate" | "high" | "very_high";
export type DestinationRole = "anchor" | "culture" | "nature" | "recovery" | "contrast";
export type TransportMode = "high_speed_rail" | "flight" | "train" | "bus";
export type ComfortLevel = "high" | "moderate" | "low";

export interface DestinationData {
  destination_id: string;
  name: string;
  name_cn: string;
  interest_tags: string[];
  primary_cluster: PrimaryCluster;
  min_recommended_stay_days: number;
  transport_hub_tier: TransportHubTier;
  best_seasons: Season[];
  weather_risk_level: WeatherRiskLevel;
  crowd_level: CrowdLevel;
  role_options: DestinationRole[];
  base_description: string;
  planning_effort_level: PlanningEffort;
  image_url: string;
}

export interface TransportConnectionData {
  origin_id: string;
  destination_id: string;
  mode: TransportMode;
  duration_hours: number;
  comfort_level: ComfortLevel;
}

// Constants
export const INTERESTS: Interest[] = [
  { id: "ancient-history-culture", label: "Ancient History & Culture", emoji: "🏛️" },
  { id: "modern-architecture", label: "Modern Architecture & City Life", emoji: "🌃" },
  { id: "natural-landscapes", label: "Natural Landscapes & Hiking", emoji: "⛰️" },
  { id: "food-culinary", label: "Food & Culinary Experiences", emoji: "🍜" },
  { id: "traditional-arts", label: "Traditional Arts & Crafts", emoji: "🎨" },
  { id: "religious-spiritual", label: "Religious & Spiritual Sites", emoji: "🏯" },
  { id: "ethnic-minorities", label: "Ethnic Minorities & Local Culture", emoji: "🏘️" },
  { id: "photography-scenic", label: "Photography & Scenic Views", emoji: "📸" },
  { id: "shopping-markets", label: "Shopping & Markets", emoji: "🛍️" },
  { id: "nightlife-entertainment", label: "Nightlife & Entertainment", emoji: "🎭" },
  { id: "museums-exhibitions", label: "Museums & Exhibitions", emoji: "🏛️" },
  { id: "adventure-outdoor", label: "Adventure & Outdoor Activities", emoji: "🧗" },
];
