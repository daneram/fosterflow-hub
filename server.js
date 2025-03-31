import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.static(join(__dirname, 'dist')));
app.use(bodyParser.json());

// In-memory feature flags store (in a production app, this would be in a database)
const featureFlags = {
  CARERS_DASHBOARD: {
    id: 'CARERS_DASHBOARD',
    enabled: false,
    rolloutPercentage: 20,
  },
  ADVANCED_SEARCH: {
    id: 'ADVANCED_SEARCH',
    enabled: true,
    rolloutPercentage: null,
  },
  AI_INSIGHTS: {
    id: 'AI_INSIGHTS',
    enabled: false,
    rolloutPercentage: 10,
  },
  ENHANCED_REPORTING: {
    id: 'ENHANCED_REPORTING',
    enabled: false,
    rolloutPercentage: 50,
  },
  WORKFLOW_AUTOMATION: {
    id: 'WORKFLOW_AUTOMATION',
    enabled: false,
    rolloutPercentage: null,
  },
};

// Feature flags API endpoints
app.get('/api/feature-flags', (req, res) => {
  const flags = Object.values(featureFlags).map(flag => ({
    id: flag.id,
    enabled: flag.enabled,
    rolloutPercentage: flag.rolloutPercentage,
  }));
  
  res.json({
    flags,
    fetchedAt: new Date().toISOString()
  });
});

app.put('/api/feature-flags/:id', (req, res) => {
  const { id } = req.params;
  const { enabled, rolloutPercentage } = req.body;
  
  if (!featureFlags[id]) {
    return res.status(404).json({ error: 'Feature flag not found' });
  }
  
  // Update the feature flag
  featureFlags[id] = {
    ...featureFlags[id],
    enabled: enabled !== undefined ? enabled : featureFlags[id].enabled,
    rolloutPercentage: rolloutPercentage !== undefined ? rolloutPercentage : featureFlags[id].rolloutPercentage,
  };
  
  res.json(featureFlags[id]);
});

// For any other request, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});