const RecommendationService = require('../services/RecommendationService');
const OpenAIService = require('../services/OpenAIService');

export class RecommendationController {
  constructor() {
    this.recommendationService = new RecommendationService();
    this.openAIService = new OpenAIService();
  }

  async getRecommendations(req, res) {
    const { type, useAI } = req.body;

    try {
      let recommendations;

      if (useAI) {
        recommendations = await this.openAIService.getRecommendationFromAI(type);
      } else {
        recommendations = this.recommendationService.getRecommendationFromDB(type);
      }

      res.json({ recommendations });
    } catch (error) {
      console.error('Error in getRecommendations:', error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
}