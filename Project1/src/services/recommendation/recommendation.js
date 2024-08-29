const fs = require('fs');
const path = require('path');
const Recommendation = require('../../db/models/Recommendation');
const { ValidationError } = require('../../error-handler/error-handler');

class RecommendationService {
  constructor() {
    this.db = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../db.json'), 'utf-8'));
  }

  getRecommendation(requestFor, type, userInput) {
    const filteredRecommendations = this.db.recommendations.find(record => record[type] === userInput);
    if (!filteredRecommendations) {
      throw new ValidationError('No recommendations found for the given input.');
    }
    const recommendation = new Recommendation(filteredRecommendations.place, filteredRecommendations.genre, filteredRecommendations.song);

    const response = {};

    if (requestFor.includes('song') && recommendation.song) {
      response.song = recommendation.song;
    }

    if (requestFor.includes('genre') && recommendation.genre) {
      response.genre = recommendation.genre;
    }

    if (requestFor.includes('place') && recommendation.place) {
      response.place = recommendation.place;
    }

    return response;
  }
}

module.exports = RecommendationService;
