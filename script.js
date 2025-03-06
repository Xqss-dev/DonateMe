let clicks = 0;
let autoClickerCount = 0;
let autoClickerCost = 100;
let messageHistory = [];

// Обновить счет
function updateScore() {
    document.getElementById('score').textContent = `Клики: ${clicks}`;
}

// Кнопка клика
document.getElementById('clicker-btn').addEventListener('click', () => {
    clicks++;
    updateScore();
});

// Магазин улучшений
document.getElementById('auto-clicker').addEventListener('click', () => {
    if (clicks >= autoClickerCost) {
        clicks -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // Увеличиваем стоимость
        document.getElementById('auto-clicker-count').textContent = autoClickerCount;
        document.getElementById('score').textContent = `Клики: ${clicks}`;
    }
});

// Автокликер
setInterval(() => {
    if (autoClickerCount > 0) {
        clicks += autoClickerCount;
        updateScore();
    }
}, 1000);

// Чат
document.getElementById('send-btn').addEventListener('click', () => {
    let message = document.getElementById('message-input').value;
    if (message) {
        messageHistory.push({ name: 'Игрок', message });
        updateChat();
        saveMessages();
    }
    document.getElementById('message-input').value = '';
});

// Обновление чата
function updateChat() {
    let messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    messageHistory.forEach(msg => {
        let messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <div class="message-header">${msg.name}</div>
            <div class="message-text">${msg.message}</div>
        `;
        messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}

// Сохранение сообщений в JSON
function saveMessages() {
    const messagesJson = JSON.stringify(messageHistory, null, 2);
    localStorage.setItem('messages', messagesJson);
}

// Загрузка сохраненных сообщений при старте
window.onload = () => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
        messageHistory = JSON.parse(savedMessages);
        updateChat();
    }
};
