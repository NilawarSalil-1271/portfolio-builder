const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// @desc    Create or update user's portfolio
// @route   POST /api/portfolio
// @access  Private
const upsertPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;
    const portfolioData = req.body;

    // We make sure the user ID is enforced from the token, not the body
    portfolioData.user = userId;

    // Find existing portfolio
    let portfolio = await Portfolio.findOne({ user: userId });

    if (portfolio) {
      // Update
      portfolio = await Portfolio.findOneAndUpdate(
        { user: userId },
        { $set: portfolioData },
        { new: true, runValidators: true }
      );
    } else {
      // Create
      portfolio = await Portfolio.create(portfolioData);
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get portfolio by username
// @route   GET /api/portfolio/:username
// @access  Public
const getPortfolioByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // 1. Find user by username
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Find portfolio by user id
    const portfolio = await Portfolio.findOne({ user: user._id }).populate('user', 'username email');
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found for this user' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upsertPortfolio,
  getPortfolioByUsername,
};
