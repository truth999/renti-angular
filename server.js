const express = require('express');
const path = require('path');

// Express server
const app = express();

const DIST_FOLDER = path.join(process.cwd(), 'dist/');
const PORT = process.env.PORT || 4205;

app.use(express.static(DIST_FOLDER));
app.get('*', (req, res) => {
  res.sendFile(DIST_FOLDER + '/index.html');
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

