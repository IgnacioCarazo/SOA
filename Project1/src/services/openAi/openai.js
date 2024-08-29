const { OpenAI } = require('openai'); // Use OpenAI instead of OpenAIApi
const { ExternalAPIError } = require('../../error-handler/error-handler');

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getRecommendationFromAI(requestFor, type, userInput) {
    try {
      const requestForString = requestFor.join(', ');
      const prompt = `Give me a recommendation for the ${type}: ${userInput}, that includes ${requestForString}. Please limit the message to a short sentence.`;
    
      const response = await this.openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });
    
      return response.choices[0].message.content.trim();
    } catch (error) {
      if (error) {
        throw new ExternalAPIError('An unexpected error occurred while getting the recommendation from the AI service.');
      }
    }
  }
}

module.exports = OpenAIService;

