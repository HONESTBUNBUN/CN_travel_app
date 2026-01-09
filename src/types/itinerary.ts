/**
 * Itinerary Type Definitions
 *
 * Defines the structure for automatically generated itinerary plans
 * based on selected destinations and user inputs
 */

import type { TravelPace } from "./index";

/**
 * Transport method between destinations
 */
export type TransportMethod =
  | "high-speed-train"
  | "flight"
  | "overnight-train"
  | "regional-train"
  | "bus";

/**
 * Daily pace intensity
 */
export type DayPace = "light" | "moderate" | "packed";

/**
 * Itinerary item category
 */
export type ItemCategory =
  | "transport"
  | "attraction"
  | "food"
  | "shopping"
  | "accommodation"
  | "activity"
  | "rest";

/**
 * Connection information between itinerary items
 */
export interface ItemConnection {
  distanceKm?: number;
  durationMin?: number;
  mode?: "walk" | "metro" | "taxi" | "bus";
}

/**
 * Structured itinerary item for day-level detail
 */
export interface ItineraryItem {
  order: number; // 1, 2, 3...
  category: ItemCategory;
  title: string; // Place name or activity name
  shortDescription: string; // One-line explanation
  imageUrl?: string; // Optional thumbnail
  connection?: ItemConnection; // Connection to next item
}

/**
 * Role of a destination in the overall itinerary
 */
export type DestinationRole =
  | "arrival-city" // Entry point, orientation
  | "main-destination" // Core experience
  | "day-trip-base" // Hub for nearby excursions
  | "departure-city"; // Exit point

/**
 * Itinerary theme/focus
 */
export type ItineraryTheme =
  | "balanced" // Mix of everything
  | "nature-focused" // Emphasize natural landscapes
  | "cities-first" // Urban experiences priority
  | "culture-deep-dive"; // Temples, ancient sites, traditions

/**
 * Single day's plan within an itinerary
 */
export interface DayPlan {
  dayNumber: number; // Overall trip day (1, 2, 3...)
  localDay: number; // Day within current destination (1, 2, 3...)
  theme: string; // e.g., "Arrival & orientation", "Temple exploration"
  intent: string; // Why this day is structured this way
  items: string[]; // High-level activities (backwards compatible)
  structuredItems?: ItineraryItem[]; // Detailed items with category, image, etc.
  pace: DayPace; // How intense is this day
  notes?: string; // Optional logistics notes
}

/**
 * Transport connection to next destination
 */
export interface TransportConnection {
  method: TransportMethod;
  duration: string; // e.g., "5h", "1.5h flight"
  travelDay: number; // Which trip day is spent traveling
  departureTime?: string; // e.g., "Morning", "Afternoon"
  notes?: string; // Optional tips (e.g., "Book in advance")
}

/**
 * A segment of the route (one destination)
 */
export interface RouteSegment {
  destinationId: string;
  destinationName: string;
  nights: number; // Number of nights staying here
  arrivalDay: number; // Which trip day you arrive (Day 1, Day 4, etc.)
  departureDay: number; // Which trip day you depart
  role: DestinationRole;

  // Transport to next destination (null if last stop)
  nextTransport: TransportConnection | null;

  // Daily breakdown for this destination
  days: DayPlan[];
}

/**
 * Complete itinerary plan
 */
export interface ItineraryPlan {
  id: string;
  name: string; // e.g., "Balanced Explorer", "Nature Immersion"
  theme: ItineraryTheme;
  tagline: string; // Short summary (1 sentence)

  // Trip overview
  totalDays: number;
  totalNights: number;
  destinationIds: string[]; // Selected destination IDs
  destinationCount: number;

  // Route overview
  route: RouteSegment[];

  // Who this is for
  bestFor: {
    pace: TravelPace[]; // Which paces this suits
    interests: string[]; // Primary interests this covers
    tripLength: { min: number; max: number }; // Ideal trip length range
  };

  // Explicit constraints & trade-offs
  tradeoffs: string[]; // e.g., "Fast-paced in Beijing to fit Great Wall"

  // Summary stats
  stats: {
    totalFlights: number;
    totalTrainRides: number;
    lightDays: number;
    moderateDays: number;
    packedDays: number;
    travelDays: number;
  };
}

/**
 * Result of itinerary generation
 */
export interface ItineraryGenerationResult {
  itineraries: ItineraryPlan[];
  message?: string; // Optional message if something is unusual
  warnings?: string[]; // Warnings about feasibility
}
