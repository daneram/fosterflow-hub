import { useFeatureFlag as useFeatureFlagBase, FeatureFlag } from '@/lib/feature-flags';

/**
 * Hook to check if a feature flag is enabled
 * @param flag The feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export const useFeatureFlag = (flag: FeatureFlag): boolean => {
  return useFeatureFlagBase(flag);
};

/**
 * Hook to conditionally render content based on a feature flag
 * @param flag The feature flag to check
 * @param enabled Content to render when the feature is enabled
 * @param disabled Optional content to render when the feature is disabled
 * @returns The rendered content based on the feature flag state
 */
export function FeatureGated<T>({
  flag,
  enabled,
  disabled = null,
}: {
  flag: FeatureFlag;
  enabled: T;
  disabled?: T | null;
}): T | null {
  const isEnabled = useFeatureFlagBase(flag);
  return isEnabled ? enabled : disabled;
} 