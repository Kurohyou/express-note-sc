// Import express
import express from 'express';
import { router as routes } from './routes/apiNotes.js';

// import path module
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize app
const app = express();
// define port
const PORT = process.env.PORT || 3001;

// make the public folder usable
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json

/**
 * Define default route to serve index.html
 */
app.get('/', (req,res) => 
  res.sendFile(path.join(__dirname, 'public/index.html')));

/**
 * Serve the notes html page
 */
app.get('/notes',(req,res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html')));

/**
 * Use the routes
 */
app.use('/api/notes',routes);

app.listen(PORT, () =>
  console.log(`Expressive Notes listening at http://localhost:${PORT}`)
);