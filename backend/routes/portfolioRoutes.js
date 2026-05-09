const express = require('express');
const router = express.Router();
const { upsertPortfolio, getPortfolioByUsername } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upsertPortfolio);
router.get('/:username', getPortfolioByUsername);

module.exports = router;
