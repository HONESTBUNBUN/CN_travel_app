import type { UserInputs, Destination } from "@/types";
import { mockDestinations } from "@/data/mockDestinations";

/**
 * Recommendation Logic (Fixed)
 *
 * Requirements:
 * - Filter by interests (must match at least 1 interest)
 * - Max 8 destinations returned
 * - Scoring: pace + effort + popularity + diversity + interest strength
 * - If < 3 matches, relax filter with explanation
 *
 * Scoring weights:
 * - Popularity/first-time suitability: 40%
 * - Geographic diversity: 35%
 * - Interest match strength: 25%
 */

// Major destinations for first-time visitors
const FIRST_TIME_DESTINATIONS = new Set([
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guilin",
  "hongkong",
  "suzhou",
  "hangzhou",
  "lijiang",
  "zhangjiajie",
]);

// UNESCO World Heritage Sites
const UNESCO_SITES = new Set([
  "beijing",
  "xian",
  "guilin",
  "suzhou",
  "hangzhou",
  "huangshan",
  "pingyao",
  "lijiang",
  "jiuzhaigou",
  "zhangye-danxia",
  "hongkong",
  "luoyang",
  "datong",
]);

// Cities accessible by high-speed rail
const HIGH_SPEED_RAIL_CITIES = new Set([
  "beijing",
  "shanghai",
  "xian",
  "hangzhou",
  "suzhou",
  "nanjing",
  "guangzhou",
  "shenzhen",
  "wuhan",
  "changsha",
  "chengdu",
  "chongqing",
]);

interface ScoredDestination {
  destination: Destination;
  score: number;
  interestMatches: number;
}

/**
 * Calculate popularity score (max 10 points)
 */
function getPopularityScore(destination: Destination): number {
  let score = 0;

  if (FIRST_TIME_DESTINATIONS.has(destination.id)) {
    score += 10; // Major must-see destination
  }

  if (UNESCO_SITES.has(destination.id)) {
    score += 8; // UNESCO recognition
  }

  if (HIGH_SPEED_RAIL_CITIES.has(destination.id)) {
    score += 5; // Easy accessibility
  }

  return Math.min(score, 10); // Cap at 10
}

/**
 * Calculate geographic diversity score (max 10 points)
 */
function getDiversityScore(
  destination: Destination,
  selectedRegions: Map<string, number>
): number {
  const regionCount = selectedRegions.get(destination.region) || 0;

  if (regionCount === 0) {
    return 10; // New region - highest priority
  } else if (regionCount === 1) {
    return 5; // Second from this region - moderate priority
  } else {
    return -5; // Already have 2+ from this region - penalize
  }
}

/**
 * Calculate interest match strength (max 10 points)
 */
function getInterestScore(
  destination: Destination,
  userInterests: string[]
): number {
  const matches = destination.matchingInterests.filter((interest) =>
    userInterests.includes(interest)
  );

  let score = matches.length * 5; // 5 points per matching interest

  // Bonus if matches first interest (top priority)
  if (userInterests.length > 0 && destination.matchingInterests.includes(userInterests[0])) {
    score += 3;
  }

  return Math.min(score, 10); // Cap at 10
}

/**
 * Calculate pace match score (max 5 points)
 */
function getPaceScore(destination: Destination, pace?: string): number {
  if (!pace) return 0;
  return destination.suitablePace.includes(pace as any) ? 5 : 0;
}

/**
 * Calculate planning effort score (max 3 points)
 */
function getEffortScore(destination: Destination, planningEffort?: string): number {
  if (!planningEffort) return 0;

  // Off-the-beaten-path destinations reward high planning effort
  const offBeatenPath = ![...FIRST_TIME_DESTINATIONS].includes(destination.id);

  if (planningEffort === "high" && offBeatenPath) {
    return 3; // Reward adventurous travelers exploring hidden gems
  } else if (planningEffort === "low" && FIRST_TIME_DESTINATIONS.has(destination.id)) {
    return 3; // Easy destinations for low-effort planners
  } else if (planningEffort === "medium") {
    return 2; // Balanced approach
  }

  return 0;
}

/**
 * Main recommendation function
 */
export function getRecommendedDestinations(inputs: Partial<UserInputs>): {
  destinations: Destination[];
  relaxedFilter: boolean;
  message?: string;
} {
  if (!inputs.interests || inputs.interests.length === 0) {
    return {
      destinations: [],
      relaxedFilter: false,
      message: "Please select at least one interest to see recommendations.",
    };
  }

  // Step 1: Filter by interests (must match at least 1)
  const filtered = mockDestinations.filter((destination) =>
    destination.matchingInterests.some((interest) =>
      inputs.interests!.includes(interest)
    )
  );

  // Step 2: Handle edge cases
  if (filtered.length === 0) {
    return {
      destinations: [],
      relaxedFilter: false,
      message: "No destinations match your interests. Try selecting different interests.",
    };
  }

  if (filtered.length < 3) {
    // Relaxation: include nearby destinations from same regions
    const regions = new Set(filtered.map((d) => d.region));
    const relaxed = mockDestinations.filter(
      (d) => regions.has(d.region) && !filtered.includes(d)
    );

    const combined = [...filtered, ...relaxed.slice(0, 8 - filtered.length)];

    return {
      destinations: combined.slice(0, 8),
      relaxedFilter: true,
      message: `We found ${filtered.length} matches. We've included nearby destinations to give you more options.`,
    };
  }

  // Step 3: Score all filtered destinations
  const regionCounts = new Map<string, number>();

  const scored: ScoredDestination[] = filtered.map((destination) => {
    let totalScore = 0;

    // Popularity (40% weight = max 10 points * 0.4 = 4)
    const popularityScore = getPopularityScore(destination);
    totalScore += popularityScore * 0.4;

    // Geographic diversity (35% weight = max 10 points * 0.35 = 3.5)
    const diversityScore = getDiversityScore(destination, regionCounts);
    totalScore += diversityScore * 0.35;

    // Interest strength (25% weight = max 10 points * 0.25 = 2.5)
    const interestScore = getInterestScore(destination, inputs.interests!);
    totalScore += interestScore * 0.25;

    // Pace bonus (up to 5 extra points)
    totalScore += getPaceScore(destination, inputs.pace);

    // Planning effort bonus (up to 3 extra points)
    totalScore += getEffortScore(destination, inputs.planningEffort);

    const interestMatches = destination.matchingInterests.filter((interest) =>
      inputs.interests!.includes(interest)
    ).length;

    return {
      destination,
      score: totalScore,
      interestMatches,
    };
  });

  // Step 4: Sort by score
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // Higher score first
    }
    // Tiebreaker: more interest matches
    return b.interestMatches - a.interestMatches;
  });

  // Step 5: Apply diversity while selecting top 8
  const selected: Destination[] = [];
  const selectedRegions = new Map<string, number>();

  for (const { destination } of scored) {
    if (selected.length >= 8) break;

    // Track region distribution
    const regionCount = selectedRegions.get(destination.region) || 0;
    selectedRegions.set(destination.region, regionCount + 1);

    selected.push(destination);

    // Update diversity score for remaining destinations
    regionCounts.set(destination.region, regionCount + 1);
  }

  // Step 6: Alternate regions for display order (avoid clustering)
  const byRegion = new Map<string, Destination[]>();
  selected.forEach((d) => {
    if (!byRegion.has(d.region)) {
      byRegion.set(d.region, []);
    }
    byRegion.get(d.region)!.push(d);
  });

  const alternated: Destination[] = [];
  const regionQueues = Array.from(byRegion.values());
  let idx = 0;

  while (alternated.length < selected.length) {
    for (const queue of regionQueues) {
      if (queue.length > 0) {
        alternated.push(queue.shift()!);
      }
    }
    idx++;
  }

  return {
    destinations: alternated,
    relaxedFilter: false,
  };
}
