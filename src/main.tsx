
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
