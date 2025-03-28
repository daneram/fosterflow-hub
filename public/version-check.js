// Simple script to check versions and dependencies
console.log('Version checker running');

// Create a div to display information
const div = document.createElement('div');
div.style.fontFamily = 'monospace';
div.style.background = '#f5f5f5';
div.style.padding = '20px';
div.style.margin = '20px';
div.style.borderRadius = '5px';

// Add some info about the browser and environment
div.innerHTML = `
  <h2>Environment Information</h2>
  <p>User Agent: ${navigator.userAgent}</p>
  <p>Current URL: ${window.location.href}</p>
  <p>Window Size: ${window.innerWidth}x${window.innerHeight}</p>
  <h2>Status</h2>
  <p id="status">Checking...</p>
`;

// Add to document
document.body.appendChild(div);

// Update status
function updateStatus(message, isError = false) {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.color = isError ? 'red' : 'green';
  }
}

// Check if React exists
if (window.React) {
  updateStatus(`React version: ${window.React.version}`);
} else {
  updateStatus('React is not loaded or not available on window', true);
}

// Report load success
window.addEventListener('load', () => {
  updateStatus('Window loaded successfully');
}); 