import { useEffect, useRef } from 'react';

interface DebugState {
  isOpen: boolean;
  isMobile: boolean;
  isNavigating: boolean;
  isTransitioning: boolean;
  pathname: string;
}

const debugLog = (event: string, data?: any) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const stack = new Error().stack?.split('\n')[2]?.trim() || '';
  console.group(`%c SIDEBAR_DEBUG [${timestamp}]: ${event}`, 
    'background: #dc2626; color: white; padding: 2px 4px; border-radius: 2px;');
  console.log('Data:', data);
  console.log('Called from:', stack);
  console.groupEnd();
};

export const useDebugSidebar = (state: DebugState) => {
  const prevStateRef = useRef<DebugState>(state);
  const transitionsRef = useRef<{
    start: number;
    type: string;
  }[]>([]);

  // Track all state changes
  useEffect(() => {
    const changes: Record<string, { from: any; to: any }> = {};
    Object.entries(state).forEach(([key, value]) => {
      if (prevStateRef.current[key as keyof DebugState] !== value) {
        changes[key] = {
          from: prevStateRef.current[key as keyof DebugState],
          to: value
        };
      }
    });

    if (Object.keys(changes).length > 0) {
      debugLog('State changed', {
        changes,
        currentTransitions: transitionsRef.current,
        timeSinceLastTransition: transitionsRef.current.length > 0 
          ? Date.now() - transitionsRef.current[transitionsRef.current.length - 1].start
          : null
      });
    }

    prevStateRef.current = state;
  }, [state]);

  const startTransition = (type: string) => {
    const transition = {
      start: Date.now(),
      type
    };
    transitionsRef.current.push(transition);
    debugLog('Starting transition', {
      type,
      activeTransitions: transitionsRef.current
    });
  };

  const endTransition = (type: string) => {
    const transitionIndex = transitionsRef.current.findIndex(t => t.type === type);
    if (transitionIndex > -1) {
      const transition = transitionsRef.current[transitionIndex];
      const duration = Date.now() - transition.start;
      transitionsRef.current.splice(transitionIndex, 1);
      debugLog('Ending transition', {
        type,
        duration,
        remainingTransitions: transitionsRef.current
      });
    }
  };

  return {
    startTransition,
    endTransition
  };
}; 