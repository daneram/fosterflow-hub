// Use CommonJS syntax for Elastic Beanstalk compatibility
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any other request, serve the index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port);
console.log('Server started on port ' + port); 