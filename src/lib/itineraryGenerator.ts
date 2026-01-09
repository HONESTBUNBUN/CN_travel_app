import type { UserInputs, Destination } from "@/types";
import type {
  ItineraryPlan,
  ItineraryGenerationResult,
  RouteSegment,
  DayPlan,
  TransportConnection,
  ItineraryTheme,
  ItineraryItem,
} from "@/types/itinerary";

/**
 * Itinerary Generation Logic
 *
 * Generates 3-4 automatic itinerary options based on:
 * - Selected interested destinations
 * - User inputs (trip length, pace, interests)
 *
 * Constraints:
 * - Max 1 long-distance transfer every 2-3 days
 * - Clear pacing logic (arrival day, travel day, rest buffer)
 * - Geographic clustering (avoid zigzagging)
 */

// Transport data between major cities
const TRANSPORT_MAP: Record<string, Record<string, TransportConnection>> = {
  beijing: {
    shanghai: { method: "high-speed-train", duration: "5.5h", travelDay: 0 },
    xian: { method: "high-speed-train", duration: "5h", travelDay: 0 },
    chengdu: { method: "flight", duration: "3h", travelDay: 0 },
    guilin: { method: "flight", duration: "3h", travelDay: 0 },
    hongkong: { method: "flight", duration: "3.5h", travelDay: 0 },
  },
  shanghai: {
    beijing: { method: "high-speed-train", duration: "5.5h", travelDay: 0 },
    xian: { method: "high-speed-train", duration: "6h", travelDay: 0 },
    suzhou: { method: "high-speed-train", duration: "30min", travelDay: 0 },
    hangzhou: { method: "high-speed-train", duration: "1h", travelDay: 0 },
    guilin: { method: "flight", duration: "2.5h", travelDay: 0 },
    hongkong: { method: "flight", duration: "2.5h", travelDay: 0 },
  },
  xian: {
    beijing: { method: "high-speed-train", duration: "5h", travelDay: 0 },
    shanghai: { method: "high-speed-train", duration: "6h", travelDay: 0 },
    chengdu: { method: "high-speed-train", duration: "4h", travelDay: 0 },
    guilin: { method: "flight", duration: "2h", travelDay: 0 },
  },
  chengdu: {
    beijing: { method: "flight", duration: "3h", travelDay: 0 },
    xian: { method: "high-speed-train", duration: "4h", travelDay: 0 },
    chongqing: { method: "high-speed-train", duration: "1.5h", travelDay: 0 },
    lijiang: { method: "flight", duration: "1.5h", travelDay: 0 },
    guilin: { method: "flight", duration: "2h", travelDay: 0 },
  },
  guilin: {
    beijing: { method: "flight", duration: "3h", travelDay: 0 },
    shanghai: { method: "flight", duration: "2.5h", travelDay: 0 },
    xian: { method: "flight", duration: "2h", travelDay: 0 },
    chengdu: { method: "flight", duration: "2h", travelDay: 0 },
    hongkong: { method: "high-speed-train", duration: "3h", travelDay: 0 },
  },
  hongkong: {
    beijing: { method: "flight", duration: "3.5h", travelDay: 0 },
    shanghai: { method: "flight", duration: "2.5h", travelDay: 0 },
    guilin: { method: "high-speed-train", duration: "3h", travelDay: 0 },
    guangzhou: { method: "high-speed-train", duration: "1h", travelDay: 0 },
    shenzhen: { method: "high-speed-train", duration: "20min", travelDay: 0 },
  },
};

/**
 * Get transport connection between two destinations
 */
function getTransport(
  fromId: string,
  toId: string
): TransportConnection | null {
  return TRANSPORT_MAP[fromId]?.[toId] || null;
}

/**
 * Calculate minimum nights needed for a destination based on interests
 */
function getMinimumNights(
  destination: Destination,
  userInterests: string[]
): number {
  // Base minimum
  let nights = destination.minimumDays - 1;

  // Add nights if multiple interests match
  const matches = destination.matchingInterests.filter((i) =>
    userInterests.includes(i)
  ).length;

  if (matches >= 3) {
    nights += 1; // Extra day for multi-interest exploration
  }

  return Math.max(nights, 1); // At least 1 night
}

/**
 * Generate daily plans for a destination stay
 */
function generateDayPlans(
  segment: Omit<RouteSegment, "days">,
  destination: Destination,
  userInputs: Partial<UserInputs>
): DayPlan[] {
  const days: DayPlan[] = [];
  const totalDays = segment.nights + 1; // Nights + departure day

  for (let i = 0; i < totalDays; i++) {
    const localDay = i + 1;
    const tripDay = segment.arrivalDay + i;

    if (localDay === 1) {
      // Arrival day
      days.push({
        dayNumber: tripDay,
        localDay,
        theme: "Arrival & Orientation",
        intent: "Settle in and get your bearings",
        items: [
          "Arrive in " + destination.name,
          "Check into hotel",
          "Evening walk around neighborhood",
        ],
        pace: "light",
        notes: "Light day to recover from travel",
      });
    } else if (localDay === totalDays && segment.nextTransport) {
      // Departure day (if traveling next)
      days.push({
        dayNumber: tripDay,
        localDay,
        theme: "Departure",
        intent: "Prepare for next destination",
        items: [
          "Morning: Last-minute sights or shopping",
          `Depart to ${segment.nextTransport.method.replace("-", " ")}`,
        ],
        pace: "light",
      });
    } else {
      // Full exploration day
      const dayNumber = localDay - 1; // 0-indexed for variety

      let theme: string;
      let items: string[];
      let pace: "moderate" | "packed" = "moderate";
      let structuredItems: ItineraryItem[] | undefined = undefined;

      // Vary based on destination interests
      if (
        destination.matchingInterests.includes("temples") &&
        dayNumber % 2 === 0
      ) {
        theme = "Temples & Spiritual Sites";
        items = [
          "Morning: Visit major temple",
          "Afternoon: Explore secondary shrines",
          "Evening: Traditional tea ceremony",
        ];

        // Add mock structured items for first temple day
        if (localDay === 2) {
          structuredItems = [
            {
              order: 1,
              category: "attraction",
              title: "Temple of Heaven",
              shortDescription: "Ancient imperial complex with stunning architecture",
              imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=97",
              connection: {
                distanceKm: 8.5,
                durationMin: 25,
                mode: "metro",
              },
            },
            {
              order: 2,
              category: "food",
              title: "Traditional Beijing Lunch",
              shortDescription: "Authentic Peking duck at local restaurant",
              imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=97",
              connection: {
                distanceKm: 3.2,
                durationMin: 15,
                mode: "walk",
              },
            },
            {
              order: 3,
              category: "attraction",
              title: "Lama Temple",
              shortDescription: "Beautiful Tibetan Buddhist monastery",
              imageUrl: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=97",
              connection: {
                distanceKm: 1.5,
                durationMin: 8,
                mode: "walk",
              },
            },
            {
              order: 4,
              category: "activity",
              title: "Tea Ceremony Experience",
              shortDescription: "Learn traditional Chinese tea preparation",
              imageUrl: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=97",
            },
          ];
        }
      } else if (
        destination.matchingInterests.includes("mountains") ||
        destination.matchingInterests.includes("national-parks")
      ) {
        theme = "Nature & Scenic Areas";
        items = [
          "Full day: Hiking or nature park visit",
          "Packed lunch",
          "Return by evening",
        ];
        pace = "packed";
      } else if (
        destination.matchingInterests.includes("ancient-cities") ||
        destination.matchingInterests.includes("classical-gardens")
      ) {
        theme = "Historical & Cultural Exploration";
        items = [
          "Morning: Ancient architecture walk",
          "Lunch: Local specialty",
          "Afternoon: Museum or historic site",
        ];
      } else if (
        destination.matchingInterests.includes("street-food") ||
        destination.matchingInterests.includes("night-markets")
      ) {
        theme = "Food & Local Life";
        items = [
          "Morning: Local market visit",
          "Afternoon: Cooking class or food tour",
          "Evening: Night market exploration",
        ];
      } else {
        theme = "City Exploration";
        items = [
          "Morning: Major landmark",
          "Afternoon: Free exploration",
          "Evening: Skyline or waterfront",
        ];
      }

      // Rest buffer every 4-5 days
      if (tripDay % 5 === 0 && tripDay > 1) {
        pace = "light";
        theme = "Rest & Leisure Day";
        items = [
          "Slow morning - sleep in",
          "Optional: Light sightseeing or shopping",
          "Afternoon: Relax at hotel or café",
        ];
      }

      days.push({
        dayNumber: tripDay,
        localDay,
        theme,
        intent: "Full exploration day",
        items,
        pace,
        structuredItems,
      });
    }
  }

  return days;
}

/**
 * Calculate optimal route order (avoid zigzagging)
 */
function optimizeRoute(destinations: Destination[]): Destination[] {
  if (destinations.length <= 2) return destinations;

  // Group by region
  const byRegion: Record<string, Destination[]> = {};
  destinations.forEach((d) => {
    if (!byRegion[d.region]) byRegion[d.region] = [];
    byRegion[d.region].push(d);
  });

  // Preferred routing: North → East → South → West → Central
  const regionOrder = ["North", "East", "South", "West", "Central"];
  const sorted: Destination[] = [];

  regionOrder.forEach((region) => {
    if (byRegion[region]) {
      sorted.push(...byRegion[region]);
    }
  });

  return sorted;
}

/**
 * Generate a single itinerary plan
 */
function generateItinerary(
  destinations: Destination[],
  userInputs: Partial<UserInputs>,
  theme: ItineraryTheme,
  themeName: string
): ItineraryPlan | null {
  if (destinations.length === 0) return null;

  // Optimize route order
  const optimized = optimizeRoute(destinations);

  const tripLength = userInputs.tripLength || 10;
  const route: RouteSegment[] = [];
  let currentDay = 1;
  let totalNights = 0;

  // Allocate nights to each destination
  optimized.forEach((destination, index) => {
    const isFirst = index === 0;
    const isLast = index === optimized.length - 1;

    let nights = getMinimumNights(destination, userInputs.interests || []);

    // First city gets extra time for arrival adjustment
    if (isFirst) nights = Math.max(nights, 2);

    // Last city (departure city) may need less time
    if (isLast && totalNights + nights > tripLength - 1) {
      nights = Math.max(tripLength - totalNights - 1, 1);
    }

    const arrivalDay = currentDay;
    const departureDay = currentDay + nights;

    // Get transport to next destination
    const nextDest = optimized[index + 1];
    let nextTransport: TransportConnection | null = null;

    if (nextDest) {
      const connection = getTransport(destination.id, nextDest.id);
      if (connection) {
        nextTransport = {
          ...connection,
          travelDay: departureDay,
        };
      }
    }

    // Determine role
    let role: "arrival-city" | "main-destination" | "departure-city" =
      "main-destination";
    if (isFirst) role = "arrival-city";
    if (isLast) role = "departure-city";

    const segment: Omit<RouteSegment, "days"> = {
      destinationId: destination.id,
      destinationName: destination.name,
      nights,
      arrivalDay,
      departureDay,
      role,
      nextTransport,
    };

    const segmentWithDays: RouteSegment = {
      ...segment,
      days: generateDayPlans(segment, destination, userInputs),
    };

    route.push(segmentWithDays);

    currentDay = departureDay + (nextTransport ? 1 : 0); // Add travel day if moving
    totalNights += nights;
  });

  const totalDays = currentDay - 1;

  // Calculate stats
  let totalFlights = 0;
  let totalTrainRides = 0;
  let travelDays = 0;
  let lightDays = 0;
  let moderateDays = 0;
  let packedDays = 0;

  route.forEach((segment) => {
    if (segment.nextTransport) {
      if (segment.nextTransport.method === "flight") totalFlights++;
      else totalTrainRides++;
      travelDays++;
    }

    segment.days.forEach((day) => {
      if (day.pace === "light") lightDays++;
      if (day.pace === "moderate") moderateDays++;
      if (day.pace === "packed") packedDays++;
    });
  });

  // Generate tradeoffs
  const tradeoffs: string[] = [];
  if (totalFlights > 2) {
    tradeoffs.push("Multiple flights required for this route");
  }
  if (packedDays > totalDays * 0.5) {
    tradeoffs.push("Fast-paced itinerary with many activities");
  }
  if (destinations.length > 4) {
    tradeoffs.push("Covers many destinations - limited time per city");
  }

  return {
    id: `itinerary-${theme}-${Date.now()}`,
    name: themeName,
    theme,
    tagline: `${totalDays}-day journey through ${destinations.length} destinations`,
    totalDays,
    totalNights,
    destinationIds: destinations.map((d) => d.id),
    destinationCount: destinations.length,
    route,
    bestFor: {
      pace: [userInputs.pace || "balanced"],
      interests: userInputs.interests || [],
      tripLength: { min: totalDays - 2, max: totalDays + 2 },
    },
    tradeoffs,
    stats: {
      totalFlights,
      totalTrainRides,
      lightDays,
      moderateDays,
      packedDays,
      travelDays,
    },
  };
}

/**
 * Main itinerary generation function
 * Generates 3-4 automatic itinerary options
 */
export function generateItineraries(
  interestedDestinations: Destination[],
  userInputs: Partial<UserInputs>
): ItineraryGenerationResult {
  if (interestedDestinations.length === 0) {
    return {
      itineraries: [],
      message: "No destinations selected. Please mark destinations as interested first.",
    };
  }

  if (interestedDestinations.length === 1) {
    return {
      itineraries: [],
      message:
        "Only one destination selected. Itineraries work best with 2+ destinations.",
      warnings: ["Consider adding more destinations for a multi-city trip."],
    };
  }

  const tripLength = userInputs.tripLength || 10;
  const interests = userInputs.interests || [];

  const itineraries: ItineraryPlan[] = [];

  // Option 1: Balanced (uses all or most interested destinations)
  const allDestinations = interestedDestinations.slice(0, 5); // Max 5 for balanced
  const balanced = generateItinerary(
    allDestinations,
    userInputs,
    "balanced",
    "Balanced Explorer"
  );
  if (balanced) itineraries.push(balanced);

  // Option 2: Nature-focused (filter for nature interests)
  const natureInterests = ["mountains", "national-parks", "pandas"];
  const natureDestinations = interestedDestinations.filter((d) =>
    d.matchingInterests.some((i) => natureInterests.includes(i))
  );
  if (natureDestinations.length >= 2) {
    const nature = generateItinerary(
      natureDestinations.slice(0, 4),
      userInputs,
      "nature-focused",
      "Nature Immersion"
    );
    if (nature) itineraries.push(nature);
  }

  // Option 3: Cities-first (filter for urban/cultural)
  const cityInterests = ["city-skylines", "ancient-cities", "street-food", "night-markets"];
  const cityDestinations = interestedDestinations.filter((d) =>
    d.matchingInterests.some((i) => cityInterests.includes(i))
  );
  if (cityDestinations.length >= 2) {
    const cities = generateItinerary(
      cityDestinations.slice(0, 4),
      userInputs,
      "cities-first",
      "Urban Explorer"
    );
    if (cities) itineraries.push(cities);
  }

  // Option 4: Culture deep-dive (temples, gardens, tea)
  const cultureInterests = ["temples", "classical-gardens", "tea-culture", "ancient-cities"];
  const cultureDestinations = interestedDestinations.filter((d) =>
    d.matchingInterests.some((i) => cultureInterests.includes(i))
  );
  if (cultureDestinations.length >= 2) {
    const culture = generateItinerary(
      cultureDestinations.slice(0, 4),
      userInputs,
      "culture-deep-dive",
      "Cultural Journey"
    );
    if (culture) itineraries.push(culture);
  }

  // Deduplicate if some plans are identical
  const unique = itineraries.filter(
    (plan, index, self) =>
      index ===
      self.findIndex(
        (p) => p.destinationIds.join(",") === plan.destinationIds.join(",")
      )
  );

  return {
    itineraries: unique.slice(0, 4), // Max 4 options
    message:
      unique.length < 3
        ? "Limited itinerary options based on your selections. Consider adding more destinations."
        : undefined,
  };
}
