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

    if (requestFor.includes('song') && filteredRecommendations.song) {
      response.song = filteredRecommendations.song;
    }

    if (requestFor.includes('genre') && filteredRecommendations.genre) {
      response.genre = filteredRecommendations.genre;
    }

    if (requestFor.includes('place') && filteredRecommendations.place) {
      response.place = filteredRecommendations.place;
    }

    return response;
  }
}

module.exports = RecommendationService;
