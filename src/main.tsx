
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload critical images
const preloadCriticalAssets = () => {
  const images = [
    "/lovable-uploads/6d655b66-ad8d-445b-93e9-36d9917768dc.png"
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Preload assets before app renders
preloadCriticalAssets();

const container = document.getElementById("root");
const root = createRoot(container!);

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
