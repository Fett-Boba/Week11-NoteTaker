const router = require('express').Router();
const { raw } = require('express');
const fs = require('fs');
const path = require('path');
const dbFilename = path.join(__dirname, '../../db/db.json');

router.get('/notes', async (req, res) => {
     console.log('In GET /notes');
     fs.readFile(dbFilename, (err, data) => {
          if (err) throw err;
          res.json(JSON.parse(data));
     });
});

router.post('/notes', async (req, res) => {
     // Read database
     let notes = fs.readFileSync(dbFilename);
     let note = JSON.parse(notes);

     // Add new note to database
     let id = note.length + 1;
     let jsObj = {id: `${id}`, title: `${req.body.title}`, text: `${req.body.text}`};
     note.push(jsObj);
     fs.writeFileSync(dbFilename, JSON.stringify(note, null, 2));

     // Read database again to display the new record
     let newNotes = fs.readFileSync(dbFilename);
     res.json(JSON.parse(newNotes));
});

router.delete('/notes/:id', async (req, res) => {
     let id = req.params.id;
     console.log("PARM ID: " + id);

     // Read database
     let notes = fs.readFileSync(dbFilename);
     let note = JSON.parse(notes);
     let newNote = [];
     let j = 0;

     // Detect if note deleted, and do not move to new array if so
     // for (var i=0; i < note.length; i++) {
     //      if (i != id) {
     //           newNote[j] = note[i];
     //           j++;
     //      }
     // };

     for (var i=0; i < note.length; i++) {
          console.log("DB ID: " + note[i].id);
          if (note[i].id === id) {
               newNote[j] = note[i];
               j++;
          }
     };

     for (var i=0; i< newNote.length; i++) {
          console.log(newNote[i]);
     }

     //fs.writeFileSync(dbFilename, JSON.stringify(newNote, null, 2));
     //let newNotes = fs.readFileSync(dbFilename);
     //res.json(JSON.parse(newNotes));
     
});

module.exports = router;