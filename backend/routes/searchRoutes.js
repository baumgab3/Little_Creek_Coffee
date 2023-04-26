const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

// endpoint: /search/

router.get("/:words?", searchController.getSearchResults);



module.exports = router;