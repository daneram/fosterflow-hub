import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlertTriangle, Info, RefreshCw, Settings } from 'lucide-react';
import { 
  FeatureFlag, 
  featureFlagConfigs, 
  useFeatureFlags 
} from '@/lib/feature-flags';
import { updateFeatureFlag, fetchFeatureFlags } from '@/lib/api-feature-flags';
import { toast } from '@/components/ui/use-toast';

export const FeatureFlags: React.FC = () => {
  const { flags, setFlag, resetFlags } = useFeatureFlags();
  const [isLoading, setIsLoading] = useState(false);
  const [rolloutValues, setRolloutValues] = useState<Record<string, number>>({});

  // Initialize rollout values from configuration
  useEffect(() => {
    const initialRolloutValues: Record<string, number> = {};
    featureFlagConfigs.forEach(config => {
      if (config.isRollout && config.rolloutPercentage !== undefined) {
        initialRolloutValues[config.id] = config.rolloutPercentage;
      }
    });
    setRolloutValues(initialRolloutValues);
  }, []);

  // Function to handle flag toggling
  const handleToggleFlag = async (flag: FeatureFlag, enabled: boolean) => {
    try {
      setIsLoading(true);
      const rolloutPercentage = rolloutValues[flag];
      await updateFeatureFlag(flag, enabled, rolloutPercentage);
      setFlag(flag, enabled);
      toast({
        title: 'Feature flag updated',
        description: `${enabled ? 'Enabled' : 'Disabled'} ${featureFlagConfigs.find(f => f.id === flag)?.name}`,
      });
    } catch (error) {
      console.error('Error updating feature flag:', error);
      toast({
        title: 'Failed to update feature flag',
        description: 'An error occurred while updating the feature flag.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle rollout percentage change
  const handleRolloutChange = (flag: FeatureFlag, value: number[]) => {
    setRolloutValues({
      ...rolloutValues,
      [flag]: value[0],
    });
  };

  // Function to save rollout percentage
  const saveRolloutPercentage = async (flag: FeatureFlag) => {
    try {
      setIsLoading(true);
      const percentage = rolloutValues[flag];
      await updateFeatureFlag(flag, flags[flag], percentage);
      toast({
        title: 'Rollout percentage updated',
        description: `Set to ${percentage}% for ${featureFlagConfigs.find(f => f.id === flag)?.name}`,
      });
    } catch (error) {
      console.error('Error updating rollout percentage:', error);
      toast({
        title: 'Failed to update rollout percentage',
        description: 'An error occurred while updating the rollout percentage.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to sync with server
  const syncWithServer = async () => {
    try {
      setIsLoading(true);
      const response = await fetchFeatureFlags();
      
      // Update local flags based on server response
      response.flags.forEach(serverFlag => {
        const flagId = serverFlag.id as FeatureFlag;
        setFlag(flagId, serverFlag.enabled);
        
        // Update rollout values if provided
        if (serverFlag.rolloutPercentage !== undefined) {
          setRolloutValues(prev => ({
            ...prev,
            [flagId]: serverFlag.rolloutPercentage as number,
          }));
        }
      });
      
      toast({
        title: 'Synced with server',
        description: `Successfully synchronized feature flags with server.`,
      });
    } catch (error) {
      console.error('Error syncing with server:', error);
      toast({
        title: 'Failed to sync with server',
        description: 'An error occurred while synchronizing with the server.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    resetFlags();
    toast({
      title: 'Reset feature flags',
      description: 'All feature flags have been reset to their default values.',
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">Feature Flags</CardTitle>
            <CardDescription>
              Manage feature flags and gradual rollouts
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={syncWithServer}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              disabled={isLoading}
            >
              Reset All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b pb-2 text-sm text-muted-foreground">
            <span>Feature</span>
            <span>Status</span>
          </div>
          
          <Accordion type="multiple" className="w-full">
            {featureFlagConfigs.map((config) => (
              <AccordionItem value={config.id} key={config.id}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{config.name}</span>
                    {config.isRollout && (
                      <Badge variant="outline" className="ml-2">
                        Gradual Rollout
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Switch
                      checked={flags[config.id]}
                      onCheckedChange={(checked) => handleToggleFlag(config.id, checked)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <AccordionContent>
                  <div className="pl-6 pt-2 pb-4 space-y-4">
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                    
                    {config.isRollout && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          <p className="text-sm text-muted-foreground">
                            This feature is being gradually rolled out to users.
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={`rollout-${config.id}`}>
                              Rollout Percentage: {rolloutValues[config.id] || 0}%
                            </Label>
                          </div>
                          <Slider
                            id={`rollout-${config.id}`}
                            defaultValue={[config.rolloutPercentage || 0]}
                            max={100}
                            step={5}
                            value={[rolloutValues[config.id] || 0]}
                            onValueChange={(value) => handleRolloutChange(config.id, value)}
                            disabled={isLoading}
                          />
                          <Button 
                            size="sm" 
                            className="mt-2"
                            onClick={() => saveRolloutPercentage(config.id)}
                            disabled={isLoading}
                          >
                            Update Rollout
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!flags[config.id] && (
                      <div className="flex items-center gap-2 mt-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">
                          This feature is currently disabled.
                        </p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}; 