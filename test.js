// const vamtec = require("./index");
// // vamtec(); // Starts the server setup process
// vamtec.main();

const { Bot } = require('./index');

const apiKey = 'xxxx';
const bot = new Bot(apiKey); // Default name is 'Chatbot'

bot.chat(); // Supports exiting with 'exit', 'Exit', 'stop', or 'Esc'

// Rename the bot
// bot.rename('MyBot');
