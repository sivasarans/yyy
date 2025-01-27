const axios = require('axios');

class AI {
  /**
   * Initialize the AI class with an API key.
   * @param {string} apiKey - The API key for authentication.
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  }

  /**
   * Generate text based on a prompt.
   * @param {string} prompt - The input prompt for text generation.
   * @returns {Promise<string>} - The generated text response.
   */
  async generateText(prompt) {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await axios.post(this.url, payload, { headers });
      const data = response.data;
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error(`Error occurred while making API request: ${error.message}`);
    }
  }
}

class Bot {
    /**
     * Initialize the Bot class with an API key and optional name.
     * @param {string} apiKey - The API key for the AI instance.
     * @param {string} [name='Chatbot'] - The name of the chatbot (optional).
     */
    constructor(apiKey, name = 'Chatbot') {
      this.ai = new AI(apiKey);
      this.name = name; // Default chatbot name
      this.exitCommands = ['exit', 'Exit', 'stop', 'Esc']; // Supported exit commands
    }
  
    /**
     * Rename the chatbot.
     * @param {string} newName - The new name for the chatbot.
     */
    rename(newName) {
      if (typeof newName !== 'string' || !newName.trim()) {
        throw new Error('Invalid name. The name must be a non-empty string.');
      }
      this.name = newName.trim();
    }
  
    /**
     * Start a chat session.
     */
    async chat() {
      console.log(`Type one of [${this.exitCommands.join(', ')}] to end the chat.\n`);
  
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  
      const askQuestion = async () => {
        rl.question("You: ", async (userInput) => {
          if (this.exitCommands.includes(userInput)) {
            console.log(`${this.name}: Goodbye! 👋`);
            rl.close();
            return;
          }
  
          try {
            const response = await this.ai.generateText(userInput);
            console.log(`${this.name}: ${response}`);
          } catch (error) {
            console.log(`${this.name}: Sorry, an error occurred: ${error.message}`);
          }
  
          askQuestion(); // Continue the chat
        });
      };
  
      askQuestion();
    }
  }
  

module.exports = { AI, Bot };
