// Инициализация Telegram Mini App
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Моковые данные для свайпов
const mockUsers = [
    { name: "Алексей, 24", interests: "Любит киберпанк, шахматы и гитарный рок." },
    { name: "Мария, 22", interests: "Фанат Марвел, играет в мафию и любит рисовать." },
    { name: "Дмитрий, 26", interests: "Игры (Dota 2, CS), музыка (Metal), аниме." },
    { name: "Елена, 23", interests: "Читает классику, играет в 21, увлекается фотографией." }
];

let currentUserIndex = 0;

// Инициализация первой карточки
function renderCard() {
    const container = document.getElementById('card-container');
    if (currentUserIndex >= mockUsers.length) {
        container.innerHTML = '<h3>Анкеты закончились!</h3><p>Загляните позже.</p>';
        return;
    }

    const user = mockUsers[currentUserIndex];
    container.innerHTML = `
        <div class="swipe-card" id="current-card">
            <h3>${user.name}</h3>
            <p>${user.interests}</p>
        </div>
    `;
}

// Логика свайпа
function swipeCard(direction) {
    const card = document.getElementById('current-card');
    if (!card) return;

    if (direction === 'right') {
        card.style.transform = 'translateX(150%) rotate(20deg)';
        card.style.opacity = '0';
        tg.HapticFeedback.notificationOccurred('success'); // Вибрация
    } else {
        card.style.transform = 'translateX(-150%) rotate(-20deg)';
        card.style.opacity = '0';
        tg.HapticFeedback.impactOccurred('light');
    }

    setTimeout(() => {
        currentUserIndex++;
        renderCard();
    }, 300);
}

// Переключение вкладок
function switchTab(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Убираем активный класс с кнопок
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // Показываем нужный экран
    document.getElementById(screenId).classList.add('active');
    
    // Подсвечиваем нужную кнопку
    if(screenId === 'swipe-screen') document.getElementById('nav-swipe').classList.add('active');
    if(screenId === 'games-screen') document.getElementById('nav-games').classList.add('active');
    if(screenId === 'chat-screen') document.getElementById('nav-chat').classList.add('active');
    if(screenId === 'profile-screen') document.getElementById('nav-profile').classList.add('active');
}

// Сохранение профиля
function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const interests = document.getElementById('profile-interests').value;
    
    if(name && interests) {
        // В реальном приложении здесь будет запрос к вашему API (бэкенду)
        tg.MainButton.setText("Профиль сохранен!");
        tg.MainButton.show();
        setTimeout(() => { tg.MainButton.hide(); }, 2000);
        tg.HapticFeedback.notificationOccurred('success');
    } else {
        tg.showAlert("Пожалуйста, заполните все поля");
    }
}

// Поиск игры
function findGame(gameName) {
    const statusDiv = document.getElementById('match-status');
    statusDiv.innerText = `Поиск игрока в "${gameName}"...`;
    
    // Имитация поиска (в реальности здесь будет WebSocket или запрос к БД)
    setTimeout(() => {
        statusDiv.innerText = `Соперник найден! Игра: ${gameName}. Переход в лобби...`;
        tg.HapticFeedback.notificationOccurred('success');
    }, 2000);
}

// Запуск при загрузке
window.onload = () => {
    renderCard();
};
