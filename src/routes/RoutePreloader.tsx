
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component to preload routes based on user navigation
const RoutePreloader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Preload common routes that are likely to be visited next
    const preloadRoutes = () => {
      // Always preload AI assistant as it's commonly used
      import("../pages/AIAssistantPage");
      
      // Preload dashboard related routes when on index
      if (location.pathname === '/') {
        import("../components/insights/InsightsDashboard");
        import("../components/records/RecordsExplorer");
      }
      
      // Add other preloading logic based on current route
    };
    
    preloadRoutes();
  }, [location]);
  
  return null;
};

export default RoutePreloader;
