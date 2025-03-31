# Feature Flags System

This document explains how to use the feature flags system to gradually roll out new features in both the UI and backend.

## Overview

Feature flags allow us to:
- Enable/disable features without deploying new code
- Gradually roll out features to a percentage of users
- A/B test different feature implementations
- Quickly disable problematic features without rolling back a deployment

## Available Feature Flags

The system currently supports the following feature flags:

| Flag Name | Description | Default State |
|-----------|-------------|---------------|
| `CARERS_DASHBOARD` | Enhanced carers dashboard with analytics | Disabled (20% rollout) |
| `ADVANCED_SEARCH` | Advanced search capabilities | Enabled |
| `AI_INSIGHTS` | AI-powered insights and suggestions | Disabled (10% rollout) |
| `ENHANCED_REPORTING` | Enhanced reporting tools | Disabled (50% rollout) |
| `WORKFLOW_AUTOMATION` | Automated workflow processes | Disabled |

## Using Feature Flags in React Components

### Method 1: Using the `useFeatureFlag` Hook

```tsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FeatureFlag } from '@/lib/feature-flags';

const MyComponent = () => {
  const isAdvancedSearchEnabled = useFeatureFlag(FeatureFlag.ADVANCED_SEARCH);
  
  return (
    <div>
      {isAdvancedSearchEnabled ? (
        <AdvancedSearchComponent />
      ) : (
        <BasicSearchComponent />
      )}
    </div>
  );
};
```

### Method 2: Using the `FeatureGated` Component

```tsx
import { FeatureGated } from '@/hooks/useFeatureFlag';
import { FeatureFlag } from '@/lib/feature-flags';

const MyComponent = () => {
  return (
    <div>
      <FeatureGated
        flag={FeatureFlag.CARERS_DASHBOARD}
        enabled={<EnhancedDashboard />}
        disabled={<SimpleDashboard />}
      />
    </div>
  );
};
```

## Managing Feature Flags

Feature flags can be managed through the Settings panel in the application. Navigate to:

1. Settings
2. Features tab
3. Use the toggles to enable/disable features
4. For gradual rollout features, adjust the percentage of users who will see the feature

## Backend API for Feature Flags

The backend supports the following API endpoints for feature flags:

### Get All Feature Flags

```
GET /api/feature-flags
```

Response:
```json
{
  "flags": [
    {
      "id": "CARERS_DASHBOARD",
      "enabled": false,
      "rolloutPercentage": 20
    },
    {
      "id": "ADVANCED_SEARCH",
      "enabled": true,
      "rolloutPercentage": null
    },
    // ...
  ],
  "fetchedAt": "2023-10-15T12:34:56.789Z"
}
```

### Update a Feature Flag

```
PUT /api/feature-flags/:id
```

Request body:
```json
{
  "enabled": true,
  "rolloutPercentage": 50
}
```

Response:
```json
{
  "id": "CARERS_DASHBOARD",
  "enabled": true,
  "rolloutPercentage": 50
}
```

## Adding a New Feature Flag

To add a new feature flag:

1. Add the flag to the `FeatureFlag` enum in `src/lib/feature-flags.ts`:
   ```typescript
   export enum FeatureFlag {
     // ... existing flags
     NEW_FEATURE = 'NEW_FEATURE',
   }
   ```

2. Add the flag configuration to `featureFlagConfigs` in the same file:
   ```typescript
   export const featureFlagConfigs: FeatureFlagConfig[] = [
     // ... existing configs
     {
       id: FeatureFlag.NEW_FEATURE,
       name: 'New Feature Name',
       description: 'Description of the new feature',
       defaultEnabled: false,
       isRollout: true,
       rolloutPercentage: 10,
     },
   ];
   ```

3. Add the flag to the server-side feature flags store in `server.js`:
   ```javascript
   const featureFlags = {
     // ... existing flags
     NEW_FEATURE: {
       id: 'NEW_FEATURE',
       enabled: false,
       rolloutPercentage: 10,
     },
   };
   ```

## Best Practices

1. **Clean up old flags**: Remove feature flags after a feature is fully deployed and accepted.
2. **Document flags**: Keep this document updated with all available flags.
3. **Default to off**: New features should default to disabled unless specifically intended to be available immediately.
4. **Use meaningful names**: Flag names should clearly indicate what feature they control.
5. **Fallback gracefully**: Always ensure the application works well when a feature is disabled. 