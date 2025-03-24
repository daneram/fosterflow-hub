
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Logo URL constant to ensure consistency
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

// Preload critical images before rendering the app
const preloadLogo = () => {
  return new Promise<void>((resolve) => {
    // Create image element to cache the logo in browser's memory
    const img = new Image();
    img.src = LOGO_URL;
    
    // Resolve promise when image is loaded or if it's already cached
    if (img.complete) {
      console.log("Logo already cached, ready to use");
      resolve();
    } else {
      img.onload = () => {
        console.log("Logo loaded and cached successfully");
        resolve();
      }
      img.onerror = () => {
        console.warn("Failed to preload logo, but continuing app initialization");
        resolve(); // Resolve anyway to not block app rendering
      }
    }
    
    // Add preload link to document head
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = LOGO_URL;
    link.as = 'image';
    link.type = 'image/png';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Also add the logo URL to localStorage for persistence
    try {
      localStorage.setItem('app_logo_url', LOGO_URL);
    } catch (e) {
      console.warn("Could not store logo URL in localStorage", e);
    }
  });
};

// Initialize app after preloading critical assets
const initializeApp = async () => {
  try {
    // Preload the logo before rendering the app
    await preloadLogo();
    
    const container = document.getElementById("root");
    if (!container) {
      console.error("Root element not found!");
      return;
    }
    
    const root = createRoot(container);

    // Use StrictMode in development only
    if (process.env.NODE_ENV === 'development') {
      import('react').then(({ StrictMode }) => {
        root.render(
          <StrictMode>
            <App />
          </StrictMode>
        );
      });
    } else {
      root.render(<App />);
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
    document.body.innerHTML = '<div style="color:red;padding:20px">Failed to load application. Please refresh the page.</div>';
  }
};

// Start the app initialization process
initializeApp();
