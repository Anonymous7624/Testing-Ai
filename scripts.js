// scripts.js

// Bot Configuration Handler
document.getElementById('bot-config-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const botName = document.getElementById('bot-name').value;
    const botSpeed = document.getElementById('bot-speed').value;
    const botAccuracy = document.getElementById('bot-accuracy').value;
    const currentConfig = document.getElementById('current-config');

    const config = {
        name: botName,
        speed: botSpeed,
        accuracy: botAccuracy,
    };

    // Save configuration to localStorage
    localStorage.setItem('botConfig', JSON.stringify(config));
    currentConfig.textContent = `Bot Name: ${botName}, Response Speed: ${botSpeed} ms, Accuracy: ${botAccuracy}%`;

    alert('Bot configuration saved successfully!');
});

// Bot Control Handlers
const botStatus = document.getElementById('bot-status');
const startBotsButton = document.getElementById('start-bots');
const stopBotsButton = document.getElementById('stop-bots');

startBotsButton?.addEventListener('click', function () {
    const botConfig = JSON.parse(localStorage.getItem('botConfig'));

    if (!botConfig) {
        alert('Please configure bots first!');
        return;
    }

    botStatus.innerHTML = '<p>Starting bots...</p>';

    // Simulate bots joining the game
    const numberOfBots = 5; // For example, 5 bots
    let bots = [];

    for (let i = 0; i < numberOfBots; i++) {
        bots.push({
            id: i + 1,
            name: `${botConfig.name}-${i + 1}`,
            speed: botConfig.speed,
            accuracy: botConfig.accuracy,
        });
    }

    botStatus.innerHTML = `<p>${bots.length} bots have joined the game:</p><ul>${bots.map(bot => `<li>${bot.name}</li>`).join('')}</ul>`;
});

stopBotsButton?.addEventListener('click', function () {
    botStatus.innerHTML = '<p>No bots active yet. Configure and start bots to see them here.</p>';
    alert('All bots have been stopped.');
});
