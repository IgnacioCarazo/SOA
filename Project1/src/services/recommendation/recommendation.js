const fs = require('fs');
const path = require('path');
const Recommendation = require('../../db/models/Recommendation');

class RecommendationService {
  constructor() {
    this.db = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../db.json'), 'utf-8'));
  }

  getRecommendation(requestFor, type, userInput) {
    const filteredRecommendations = this.db.recommendations.find(record => record[type] === userInput);
    if (!filteredRecommendations) {
      throw new Error('No recommendations found for the given input.');
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

    console.log(`From our personal database we can recommend for a place like ${recommendation.place} the song ${recommendation.song} from the ${recommendation.genre} genre`);
    return response;
  }
}

module.exports = RecommendationService;
