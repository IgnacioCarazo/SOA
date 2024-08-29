const { ExternalAPIError, ValidationError } = require('../error-handler/error-handler');
const openAIService = require('../services/openAi');
const recommendationService = require('../services/recommendation');

class RecommendationController {
  async getRecommendations(req, res) {
    const { requestFor, useAI, recommendation } = req.body;
    const { type, userInput } = recommendation;
    try {
      let recommendations;

      if (useAI) {
        recommendations = await openAIService.getRecommendationFromAI(requestFor, type, userInput);
      } else {
        recommendations = recommendationService.getRecommendation(requestFor, type, userInput);
      }

      res.json({ recommendations });
    } catch (error) {
      console.error('Error occurred:', error);
      if (error instanceof ExternalAPIError || error instanceof ValidationError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An internal server error occurred.' });
      }
    }
  }
}

module.exports = RecommendationController;
