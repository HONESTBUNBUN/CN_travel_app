/**
 * Destination Data Adapter
 *
 * Adapts the PRD v1.3 structured dataset (destinations.json) to the existing Destination interface
 * This allows gradual migration from mock data to real dataset
 */

import type { Destination, UserInputs } from "@/types";
import type { DestinationData } from "@/types";
import destinationsJson from "./destinations.json";
import { getUnsplashUrl } from "./destinationImages";

// Fallback function for dynamic "Why this fits" generation
// In production, this should call the AI explanation generator
function generateWhyThisFits(dest: DestinationData, inputs: UserInputs): string {
  const reasons: string[] = [];

  // Interest matching
  const matchingInterests = dest.interest_tags.filter(tag =>
    inputs.interests?.some(userInterest => {
      // Map between old interest IDs and new interest tags
      const interestMap: Record<string, string[]> = {
        'ancient-history-culture': ['Ancient History & Culture'],
        'modern-architecture': ['Modern Architecture & City Life'],
        'natural-landscapes': ['Natural Landscapes & Hiking'],
        'food-culinary': ['Food & Culinary Experiences'],
        'traditional-arts': ['Traditional Arts & Crafts'],
        'religious-spiritual': ['Religious & Spiritual Sites'],
        'ethnic-minorities': ['Ethnic Minorities & Local Culture'],
        'photography-scenic': ['Photography & Scenic Views'],
        'shopping-markets': ['Shopping & Markets'],
        'nightlife-entertainment': ['Nightlife & Entertainment'],
        'museums-exhibitions': ['Museums & Exhibitions'],
        'adventure-outdoor': ['Adventure & Outdoor Activities'],
        // Legacy mappings
        'temples': ['Religious & Spiritual Sites'],
        'ancient-cities': ['Ancient History & Culture'],
        'pandas': ['Museums & Exhibitions'], // Panda centers often museum-like
        'mountains': ['Natural Landscapes & Hiking'],
        'street-food': ['Food & Culinary Experiences'],
        'city-skylines': ['Modern Architecture & City Life'],
      };

      const mappedTags = interestMap[userInterest] || [];
      return mappedTags.some(mappedTag => tag === mappedTag);
    })
  );

  if (matchingInterests.length > 0) {
    reasons.push(`Your interests align with ${dest.name_cn}'s strengths in ${matchingInterests.slice(0, 2).join(' and ')}.`);
  }

  // Trip length fit
  if (inputs.tripLength && inputs.tripLength >= dest.min_recommended_stay_days) {
    reasons.push(`With ${inputs.tripLength} days total, you have enough time to explore ${dest.name} properly (${dest.min_recommended_stay_days} days recommended).`);
  }

  // Pace matching
  const paceMap: Record<string, string[]> = {
    'slow': ['Low'],
    'balanced': ['Low', 'Medium'],
    'fast': ['Medium', 'High']
  };

  const suitablePaces = paceMap[inputs.pace || 'balanced'] || ['Medium'];
  if (suitablePaces.includes(dest.planning_effort_level)) {
    reasons.push(`${dest.name}'s ${dest.planning_effort_level.toLowerCase()} planning effort matches your ${inputs.pace} travel pace.`);
  }

  // Weather flexibility
  if (inputs.weatherFlexibility === 'comfort-focused' && dest.weather_risk_level === 'low') {
    reasons.push(`${dest.name} has reliable weather year-round, fitting your comfort preference.`);
  }

  return reasons.join(' ') || `${dest.name} is a well-regarded destination for first-time visitors to China.`;
}

// Convert DestinationData to Destination interface
export function adaptDestination(data: DestinationData): Destination {
  return {
    id: data.destination_id,
    name: data.name,
    slug: data.destination_id,
    tags: [
      data.primary_cluster.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ...data.interest_tags.slice(0, 2).map(tag => tag.split(' ')[0])
    ].slice(0, 3),
    shortDescription: data.base_description,
    heroImage: data.image_url,

    // Detail content (these should eventually come from AI generator)
    whyPeopleLike: data.base_description,
    bestTimeToVisit: {
      seasons: data.best_seasons,
      explanation: `${data.best_seasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')} ${data.best_seasons.length > 1 ? 'are' : 'is'} the best ${data.best_seasons.length > 1 ? 'seasons' : 'season'} to visit ${data.name}.`
    },
    whyThisFits: (inputs: UserInputs) => generateWhyThisFits(data, inputs),
    goodToKnow: [
      `Recommended stay: ${data.min_recommended_stay_days} ${data.min_recommended_stay_days === 1 ? 'day' : 'days'}`,
      `Crowd level: ${data.crowd_level.replace('_', ' ')}`,
      `Transport hub: ${data.transport_hub_tier}`
    ],

    // Matching criteria
    matchingInterests: data.interest_tags,
    suitablePace: data.planning_effort_level === 'Low' ? ['slow', 'balanced'] :
                   data.planning_effort_level === 'Medium' ? ['balanced', 'fast'] :
                   ['fast'],
    minimumDays: Math.floor(data.min_recommended_stay_days),
    weatherSensitive: data.weather_risk_level !== 'low',

    // Geographic data
    region: data.primary_cluster === 'urban_modern' ? 'East' :
            data.primary_cluster === 'historical_cultural' ? 'North' :
            data.primary_cluster === 'natural_scenic' ? 'West' :
            'South'
  };
}

// Export adapted destinations
export const destinations: Destination[] = destinationsJson.destinations.map(adaptDestination);

// Export by ID for easy lookup
export const destinationsById = destinations.reduce((acc, dest) => {
  acc[dest.id] = dest;
  return acc;
}, {} as Record<string, Destination>);
