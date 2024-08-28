const fs = require('fs');

export class RecommendationService {
  getRecommendationFromDB(type) {
    const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    return db[type] || [];
  }
}
