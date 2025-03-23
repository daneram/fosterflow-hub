
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Logo URL constant to ensure consistency
const LOGO_URL = "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png";

// Preload critical images and components before rendering the app
const preloadAssets = () => {
  return Promise.all([
    preloadLogo(),
    preloadCriticalComponents()
  ]);
};

// Preload the logo
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

// Preload critical React components to improve initial render performance
const preloadCriticalComponents = () => {
  return new Promise<void>((resolve) => {
    // Using dynamic imports to preload critical components
    Promise.all([
      import('./components/layout/Sidebar.tsx'),
      import('./components/layout/sidebar/SidebarSection.tsx'),
      import('./components/layout/sidebar/NavItem.tsx'),
      import('./components/layout/sidebar/AIChatSection.tsx'),
      import('./components/layout/sidebar/BotItem.tsx')
    ]).then(() => {
      resolve();
    }).catch(() => {
      // Resolve anyway to prevent blocking the app
      resolve();
    });
  });
};

// Initialize app after preloading critical assets
const initializeApp = async () => {
  // Wait for assets to be preloaded
  await preloadAssets();
  
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
