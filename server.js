// Import express
import express from 'express';
// import path module
import path from 'path';
import { fileURLToPath } from 'url';
// import promise version of file system module
import * as files from './source/js/helper.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize app
const app = express();
// define port
const PORT = 3001;

// make the public folder usable
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json

/**
 * Define default route to serve index.html
 */
app.get('/', (req,res) => 
  res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes',(req,res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html')));

/**
 * Retrieve all notes
 */
app.get('/api/notes/',async (req,res) => {
  const data = await files.db({})
  res.json(data);
});

/**
 * Save a new note to the database
 */
app.post('/api/notes/',async (req,res) => {
  console.log(res.body);
  if(req.body?.title && req.body?.text){
    const data = await files.db({newObj:req.body});
    res.json(data);
  }else{
    res.status(404).send('Invalid Note Object');
  }
});

app.delete('/api/notes/:id',async (req,res)=>{
  console.log(req.params);
  const id = req.params.id;
  if(id){
    let toDelete;
    const data = (await files.db({}))
      .filter(obj =>{
        if(obj.id === id){
          toDelete = obj;
          return false;
        }
        return true;
      });
    console.log(data);
    await files.db({data})
    res.json(data);
  }else{
    res.status(404).send('Invalid ID');
  }
});

app.listen(PORT, () =>
  console.log(`Expressive Notes listening at http://localhost:${PORT}`)
);