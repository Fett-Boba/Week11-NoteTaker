const router = require('express').Router();
const { raw } = require('express');
const fs = require('fs');
const path = require('path');
const dbFilename = path.join(__dirname, '../../db/db.json');


// Display Notes 
router.get('/notes', async (req, res) => {
     let notes = fs.readFileSync(dbFilename);
     res.json(JSON.parse(notes));
});


// Create new note
router.post('/notes', async (req, res) => {
     // Read database and create newnote ID by adding one to the highest id in DB
     let notes = fs.readFileSync(dbFilename);
     let note = JSON.parse(notes);
     let newId = 0;
     for (var i = 0; i < note.length; i++) {
          if (note[i].id > newId) {
               newId = note[i].id;
          };
     };
     newId++;

     // Write new note to db
     let jsObj = { id: `${newId}`, title: `${req.body.title}`, text: `${req.body.text}` };
     note.push(jsObj);
     fs.writeFileSync(dbFilename, JSON.stringify(note, null, 2));

     // Read database again to display the new record
     let newNotes = fs.readFileSync(dbFilename);
     res.json(JSON.parse(newNotes));
});


// Delete Notes
router.delete('/notes/:id', async (req, res) => {
     // Get the ID of item to delete, and read the db
     let id = req.params.id;
     let notes = fs.readFileSync(dbFilename);
     let note = JSON.parse(notes);
     let newNote = [];
     let j = 0;

     // Delete Note: New array written with deleted note omitted
     for (var i = 0; i < note.length; i++) {
          if (note[i].id !== id) {
               newNote[j] = note[i];
               j++;
          }
     };

     // Write and display updated results
     fs.writeFileSync(dbFilename, JSON.stringify(newNote, null, 2));
     let newNotes = fs.readFileSync(dbFilename);
     res.json(JSON.parse(newNotes));
});

module.exports = router;