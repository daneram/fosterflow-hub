
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Logo URL constant to ensure consistency
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

// Preload critical images before rendering the app
const preloadLogo = () => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    
    // Resolve promise when image is loaded or if it's already cached
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve anyway to prevent blocking the app
    }
    
    // Set image source to trigger loading
    img.src = LOGO_URL;
    
    // Create preload link element properly
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = LOGO_URL;
    document.head.appendChild(preloadLink);
  });
};

// Initialize app after preloading critical assets
const initializeApp = async () => {
  // Wait for logo to be preloaded
  await preloadLogo();
  
  const container = document.getElementById("root");
  if (!container) return;
  
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
};

// Start the app initialization process
initializeApp();
