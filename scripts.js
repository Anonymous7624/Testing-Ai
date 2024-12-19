// Bot Configuration Handler
document.getElementById('bot-config-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const botName = document.getElementById('bot-name').value;
    const botSpeed = document.getElementById('bot-speed').value;
    const botAccuracy = document.getElementById('bot-accuracy').value;
    const numberOfBots = document.getElementById('number-of-bots').value;
    const gamePin = document.getElementById('game-pin').value;
    const currentConfig = document.getElementById('current-config');

    const config = {
        name: botName,
        speed: botSpeed,
        accuracy: botAccuracy,
        pin: gamePin,
        count: numberOfBots
    };

    // Save configuration to localStorage
    localStorage.setItem('botConfig', JSON.stringify(config));
    currentConfig.textContent = `Bot Name: ${botName}, Response Speed: ${botSpeed} ms, Accuracy: ${botAccuracy}%, Number of Bots: ${numberOfBots}, Game PIN: ${gamePin}`;

    alert('Bot configuration saved successfully!');
});

// Bot Control Handlers
const botStatus = document.getElementById('bot-status');
const startBotsButton = document.getElementById('start-bots');
const stopBotsButton = document.getElementById('stop-bots');

startBotsButton?.addEventListener('click', async function () {
    const botConfig = JSON.parse(localStorage.getItem('botConfig'));

    if (!botConfig) {
        alert('Please configure bots first!');
        return;
    }

    botStatus.innerHTML = '<p>Starting bots...</p>';

    const numberOfBots = parseInt(botConfig.count, 10);
    let bots = [];

    for (let i = 0; i < numberOfBots; i++) {
        bots.push({
            id: i + 1,
            name: `${botConfig.name}-${i + 1}`,
            speed: botConfig.speed,
            accuracy: botConfig.accuracy
        });
    }

    botStatus.innerHTML = `<p>${bots.length} bots have joined the game with PIN ${botConfig.pin}:</p><ul>${bots.map(bot => `<li>${bot.name}</li>`).join('')}</ul>`;

    // Simulate Backend Communication
    for (const bot of bots) {
        try {
            const response = await fetch('http://localhost:5000/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pin: botConfig.pin,
                    name: bot.name,
                    speed: bot.speed,
                    accuracy: bot.accuracy
                })
            });

            if (response.ok) {
                console.log(`Bot ${bot.name} successfully joined.`);
            } else {
                console.error(`Bot ${bot.name} failed to join. Response:`, await response.text());
            }
        } catch (error) {
            console.error(`Bot ${bot.name} encountered an error:`, error);
        }
    }
});

stopBotsButton?.addEventListener('click', function () {
    botStatus.innerHTML = '<p>No bots active yet. Configure and start bots to see them here.</p>';
    alert('All bots have been stopped.');
});
