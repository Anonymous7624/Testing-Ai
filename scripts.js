// scripts.js

// Quiz Form Handler
document.getElementById('quiz-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];
    const correctOption = document.getElementById('correct-option').value;

    const quizOutput = document.getElementById('quiz-output');
    quizOutput.querySelector('#quiz-question').textContent = question;

    const optionsList = quizOutput.querySelector('#quiz-options');
    optionsList.innerHTML = '';

    options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${option}`;
        if (index + 1 === parseInt(correctOption, 10)) {
            li.style.fontWeight = 'bold';
            li.style.color = 'green';
        }
        optionsList.appendChild(li);
    });
});

// Bot Configuration Form Handler
document.getElementById('bot-config-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const botName = document.getElementById('bot-name').value;
    const botSpeed = document.getElementById('bot-speed').value;
    const botAccuracy = document.getElementById('bot-accuracy').value;

    const currentConfig = document.getElementById('current-config');
    currentConfig.textContent = `Bot Name: ${botName}, Response Speed: ${botSpeed} ms, Accuracy: ${botAccuracy}%`;

    alert('Bot configuration saved successfully!');
});
