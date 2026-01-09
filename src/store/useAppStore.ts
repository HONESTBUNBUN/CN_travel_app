import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  UserInputs,
  OnboardingState,
  RecommendationState,
} from "@/types";
import type { ItineraryPlan } from "@/types/itinerary";

interface AppStore {
  // Onboarding
  onboarding: OnboardingState;
  setOnboardingStep: (step: number) => void;
  updateUserInputs: (inputs: Partial<UserInputs>) => void;
  completeStep: (step: number) => void;

  // Recommendations
  recommendations: RecommendationState;
  markDestinationInterested: (destinationId: string) => void;
  skipDestination: (destinationId: string) => void;
  nextDestination: () => void;
  resetRecommendations: () => void;

  // Itineraries
  generatedItineraries: ItineraryPlan[];
  setGeneratedItineraries: (itineraries: ItineraryPlan[]) => void;

  // Reset
  resetApp: () => void;
}

const initialState = {
  onboarding: {
    currentStep: 1,
    inputs: {},
    completedSteps: [],
  },
  recommendations: {
    currentDestinationIndex: 0,
    interestedDestinations: [],
    skippedDestinations: [],
    viewedDestinations: [],
  },
  generatedItineraries: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,

      setOnboardingStep: (step) =>
        set((state) => ({
          onboarding: { ...state.onboarding, currentStep: step },
        })),

      updateUserInputs: (inputs) =>
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            inputs: { ...state.onboarding.inputs, ...inputs },
          },
        })),

      completeStep: (step) =>
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            completedSteps: [...new Set([...state.onboarding.completedSteps, step])],
          },
        })),

      markDestinationInterested: (destinationId) =>
        set((state) => ({
          recommendations: {
            ...state.recommendations,
            interestedDestinations: [
              ...state.recommendations.interestedDestinations,
              destinationId,
            ],
            viewedDestinations: [...new Set([...state.recommendations.viewedDestinations, destinationId])],
          },
        })),

      skipDestination: (destinationId) =>
        set((state) => ({
          recommendations: {
            ...state.recommendations,
            skippedDestinations: [
              ...state.recommendations.skippedDestinations,
              destinationId,
            ],
            viewedDestinations: [...new Set([...state.recommendations.viewedDestinations, destinationId])],
          },
        })),

      nextDestination: () =>
        set((state) => ({
          recommendations: {
            ...state.recommendations,
            currentDestinationIndex:
              state.recommendations.currentDestinationIndex + 1,
          },
        })),

      resetRecommendations: () =>
        set((state) => ({
          recommendations: {
            currentDestinationIndex: 0,
            interestedDestinations: [],
            skippedDestinations: [],
            viewedDestinations: [],
          },
        })),

      setGeneratedItineraries: (itineraries) =>
        set({ generatedItineraries: itineraries }),

      resetApp: () => set(initialState),
    }),
    {
      name: "china-travel-app-storage",
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Failed to rehydrate state:', error);
        }
      },
      skipHydration: false,
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // If localStorage is corrupted, return initial state
        if (!persistedState || typeof persistedState !== 'object') {
          return initialState as any;
        }
        return persistedState;
      },
    }
  )
);
