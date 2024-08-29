const { OpenAI } = require('openai'); // Use OpenAI instead of OpenAIApi

class OpenAIService {
  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getRecommendationFromAI(requestFor, type, userInput) {
    const requestForString = requestFor.join(', ');
    const prompt = `Give me a recommendation for the ${type}: ${userInput}, that includes ${requestForString}. Please limit the message to a short sentence.`;

    // Use createChatCompletion for gpt-3.5-turbo model
    const response = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-4o-mini",
  });
  

    return response.choices[0].message.content.trim();
  }
}

module.exports = OpenAIService;
