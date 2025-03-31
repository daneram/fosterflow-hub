import { awsConfig } from './aws-config';
import { FeatureFlag, featureFlagConfigs } from './feature-flags';

// Types for API responses
interface FeatureFlagResponse {
  id: string;
  enabled: boolean;
  rolloutPercentage?: number;
}

interface FetchFlagsResponse {
  flags: FeatureFlagResponse[];
  fetchedAt: string;
}

// Base API URL
const apiBaseUrl = awsConfig.api.endpoint || '';

/**
 * Fetch feature flags from the backend
 * @returns Promise with feature flags response
 */
export const fetchFeatureFlags = async (): Promise<FetchFlagsResponse> => {
  try {
    // If no API endpoint is configured, return mock data
    if (!apiBaseUrl) {
      console.warn('No API endpoint configured, using mock feature flags');
      return getMockFeatureFlagsResponse();
    }

    const response = await fetch(`${apiBaseUrl}/api/feature-flags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for auth
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    // Fall back to mock data in case of error
    return getMockFeatureFlagsResponse();
  }
};

/**
 * Update a feature flag on the backend
 * @param flagId The feature flag ID to update
 * @param enabled Whether the flag should be enabled
 * @param rolloutPercentage Optional rollout percentage
 * @returns Promise with the updated flag
 */
export const updateFeatureFlag = async (
  flagId: FeatureFlag,
  enabled: boolean,
  rolloutPercentage?: number
): Promise<FeatureFlagResponse> => {
  try {
    // If no API endpoint is configured, return mock data
    if (!apiBaseUrl) {
      console.warn('No API endpoint configured, using mock feature flag update');
      return {
        id: flagId,
        enabled,
        rolloutPercentage
      };
    }

    const response = await fetch(`${apiBaseUrl}/api/feature-flags/${flagId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for auth
      body: JSON.stringify({
        enabled,
        rolloutPercentage
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating feature flag ${flagId}:`, error);
    // Return the input data in case of error
    return {
      id: flagId,
      enabled,
      rolloutPercentage
    };
  }
};

/**
 * Generate mock feature flags response for development
 * @returns Mock feature flags response
 */
function getMockFeatureFlagsResponse(): FetchFlagsResponse {
  return {
    flags: featureFlagConfigs.map(config => ({
      id: config.id,
      enabled: config.defaultEnabled,
      rolloutPercentage: config.rolloutPercentage
    })),
    fetchedAt: new Date().toISOString()
  };
} 