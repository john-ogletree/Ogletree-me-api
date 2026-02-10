require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'Echo-site' directory
const echoSitePath = path.join(__dirname, '..', 'Echo-site');
app.use(express.static(echoSitePath));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(echoSitePath, 'index.html'));
});

// Custom 404 handler - This should be the last route
app.use((req, res) => {
  res.status(404).sendFile(path.join(echoSitePath, '404.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
