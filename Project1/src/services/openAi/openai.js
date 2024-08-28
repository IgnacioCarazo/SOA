const { Configuration, OpenAIApi } = require('openai');

export class OpenAIService {
  constructor() {
    this.openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
  }

  async getRecommendationFromAI(type) {
    const prompt = `Give me a recommendation for a ${type}.`;
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
  }
}
