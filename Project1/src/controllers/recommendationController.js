const openAIService = require('../services/openAi');
const recommendationService = require('../services/recommendation');

class RecommendationController {
  async getRecommendations(req, res) {
    const { requestFor, useAI, recommendation } = req.body;
    const { type, userInput } = recommendation;
    try {
      let recommendations;

      if (useAI) {
        recommendation = openAIService.getRecommendationFromAI(requestFor, type, userInput)
      } else {
        recommendation = recommendationService.getRecommendation(requestFor, type, userInput);
      }

      res.json({ recommendations });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: `An error occurred while processing your request: ${error.message}` });

    }
  }
}

module.exports = RecommendationController;
