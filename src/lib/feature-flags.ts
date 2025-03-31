import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

// Enum for feature flag names
export enum FeatureFlag {
  CARERS_DASHBOARD = 'CARERS_DASHBOARD',
  ADVANCED_SEARCH = 'ADVANCED_SEARCH',
  AI_INSIGHTS = 'AI_INSIGHTS',
  ENHANCED_REPORTING = 'ENHANCED_REPORTING',
  WORKFLOW_AUTOMATION = 'WORKFLOW_AUTOMATION',
}

// Flag configuration type
export interface FeatureFlagConfig {
  id: FeatureFlag;
  name: string;
  description: string;
  defaultEnabled: boolean;
  isRollout: boolean; // Whether the flag is for gradual rollout
  rolloutPercentage?: number; // The percentage of users who should see this feature (0-100)
}

// Feature flags configuration
export const featureFlagConfigs: FeatureFlagConfig[] = [
  {
    id: FeatureFlag.CARERS_DASHBOARD,
    name: 'Carers Dashboard',
    description: 'Enables the new carers dashboard with enhanced visualization',
    defaultEnabled: false,
    isRollout: true,
    rolloutPercentage: 20,
  },
  {
    id: FeatureFlag.ADVANCED_SEARCH,
    name: 'Advanced Search',
    description: 'Enables advanced search capabilities across the application',
    defaultEnabled: true,
    isRollout: false,
  },
  {
    id: FeatureFlag.AI_INSIGHTS,
    name: 'AI Insights',
    description: 'Enables AI-powered insights and suggestions',
    defaultEnabled: false,
    isRollout: true,
    rolloutPercentage: 10,
  },
  {
    id: FeatureFlag.ENHANCED_REPORTING,
    name: 'Enhanced Reporting',
    description: 'Enables enhanced reporting tools and visualizations',
    defaultEnabled: false,
    isRollout: true,
    rolloutPercentage: 50,
  },
  {
    id: FeatureFlag.WORKFLOW_AUTOMATION,
    name: 'Workflow Automation',
    description: 'Enables automated workflow processes',
    defaultEnabled: false,
    isRollout: false,
  },
];

// Feature flags state
interface FeatureFlagsState {
  flags: Record<FeatureFlag, boolean>;
  setFlag: (flag: FeatureFlag, enabled: boolean) => void;
  isEnabled: (flag: FeatureFlag) => boolean;
  resetFlags: () => void;
}

// Get the initial state based on default values and rollout calculations
const getInitialFlags = (): Record<FeatureFlag, boolean> => {
  const flags: Partial<Record<FeatureFlag, boolean>> = {};
  
  // Generate a deterministic user ID based on cookies or create a new one
  const getUserIdentifier = (): string => {
    let userId = Cookies.get('user_id');
    if (!userId) {
      userId = Math.random().toString(36).substring(2, 15);
      Cookies.set('user_id', userId, { expires: 365 });
    }
    return userId;
  };
  
  // Calculate if a user should be included in a percentage-based rollout
  const shouldEnableForUser = (percentage: number): boolean => {
    const userId = getUserIdentifier();
    const hash = Array.from(userId).reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Normalize to a number between 0-100
    const normalized = Math.abs(hash % 100);
    return normalized < percentage;
  };
  
  // Set initial flag values based on configuration
  featureFlagConfigs.forEach(config => {
    if (config.isRollout && config.rolloutPercentage !== undefined) {
      flags[config.id] = shouldEnableForUser(config.rolloutPercentage);
    } else {
      flags[config.id] = config.defaultEnabled;
    }
  });
  
  return flags as Record<FeatureFlag, boolean>;
};

// Create the feature flags store
export const useFeatureFlags = create<FeatureFlagsState>()(
  persist(
    (set, get) => ({
      flags: getInitialFlags(),
      
      setFlag: (flag: FeatureFlag, enabled: boolean) =>
        set(state => ({
          flags: {
            ...state.flags,
            [flag]: enabled,
          },
        })),
      
      isEnabled: (flag: FeatureFlag) => get().flags[flag],
      
      resetFlags: () => set({ flags: getInitialFlags() }),
    }),
    {
      name: 'feature-flags-storage',
    }
  )
);

// React hook to check if a feature is enabled
export function useFeatureFlag(flag: FeatureFlag): boolean {
  return useFeatureFlags(state => state.isEnabled(flag));
} 