
import { useState } from 'react';

export const usePresetFilters = () => {
  const onSelectPreset = (preset: string, setSelectedType: (type: string | null) => void, setSelectedStatus: (status: string | null) => void) => {
    console.log(`Selected preset: ${preset}`);
    // Here you would implement loading a preset configuration
    switch (preset) {
      case 'recent-active-cases':
        setSelectedType('case');
        setSelectedStatus('active');
        break;
      case 'incomplete-assessments':
        setSelectedType('assessment');
        setSelectedStatus('pending');
        break;
      case 'my-documents':
        setSelectedType('document');
        break;
      default:
        break;
    }
  };

  return { onSelectPreset };
};
