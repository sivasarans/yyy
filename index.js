// greet.js

module.exports = function greet(name) {
    // List of random greetings
    const greetings = [
        `Hi, ${name}! Hope you are fine. What's the climate today?`,
        `Hi, ${name}! What's your favorite game?`,
        `Hi, ${name}! What's your hobby?`,
        `Hello, ${name}! How are you doing today?`,
        `Hey, ${name}! What have you been up to lately?`,
        `Hi, ${name}! How’s everything going?`
    ];

    // Randomly select one greeting from the list
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    return randomGreeting;
};
