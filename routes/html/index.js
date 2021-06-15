const path = require('path');
const router = require('express').Router();

// Display the notes 
router.get('/notes', async (req, res) => {
     res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Display main webpage
router.get('/', async (req, res) => {     
     res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;