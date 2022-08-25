// Import express
import express from 'express';
import * as files from '../source/js/helper.js';

export const router = express.Router();

/**
 * Retrieve all notes
 */
router.get('/',async (req,res) => {
  const data = await files.db({})
  res.json(data);
});

/**
 * Save a new note to the database
 */
router.post('/',async (req,res) => {
  console.log(res.body);
  if(req.body?.title && req.body?.text){
    const data = await files.db({newObj:req.body});
    res.json(data);
  }else{
    res.status(404).send('Invalid Note Object');
  }
});

router.delete('/:id',async (req,res)=>{
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