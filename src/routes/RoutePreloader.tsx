
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as LazyComponents from "./lazyComponents";

// Component to preload routes based on user navigation patterns
const RoutePreloader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // This ensures components are only loaded when needed, 
    // but fetched in advance based on likely navigation paths
    const preloadComponentsByContext = () => {
      // Always preload the AI Assistant as it's commonly used
      LazyComponents.AIAssistantPage._init();
      
      // Home page related prefetching
      if (location.pathname === '/') {
        // Most likely to visit from dashboard
        LazyComponents.RecordsExplorer._init();
        LazyComponents.InsightsDashboard._init();
        LazyComponents.ActivityLog._init();
      }
      
      // When on children page, likely to visit carers next
      else if (location.pathname === '/children') {
        LazyComponents.CarersDirectory._init();
      }
      
      // When on records, likely to visit form-f
      else if (location.pathname === '/records') {
        LazyComponents.FormFAssessment._init();
      }
      
      // When on policies, likely to visit team or training
      else if (location.pathname === '/policies') {
        LazyComponents.TeamDirectory._init();
        LazyComponents.TrainingPlatform._init();
      }
    };
    
    // Use requestIdleCallback to preload during browser idle time
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => preloadComponentsByContext());
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(preloadComponentsByContext, 200);
    }
  }, [location.pathname]);
  
  return null;
};

export default RoutePreloader;
