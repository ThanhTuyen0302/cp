// script.js
let cards = [
    { name: 'apple', image: 'img/apple.png' },
    { name: 'banana', image: 'img/banana.png' },
    { name: 'stawberry', image: 'img/strawberry.jpg' },
    { name: 'cherry', image: 'img/cherry.png' },
    { name: 'apple', image: 'img/apple.png' },
    { name: 'banana', image: 'img/banana.png' },
    { name: 'stawberry', image: 'img/strawberry.jpg' },
    { name: 'cherry', image: 'img/cherry.png' }
];

let flippedCards = [];
let matchedCards = [];
let score = 0;

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5); // Sắp xếp ngẫu nhiên
}

function createCard(cardData) {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = cardData.image;
    img.alt = cardData.name;
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card, cardData));
    return card;
}

function flipCard(card, cardData) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(cardData.name)) {
        card.classList.add('flipped');
        flippedCards.push({ card, cardData });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.cardData.name === secondCard.cardData.name) {
        matchedCards.push(firstCard.cardData.name);
        score += 10;
        document.getElementById('score').innerText = 'Điểm: ' + score;

        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000); // Đặt độ trễ 1 giây để lật lại thẻ nếu không khớp
    }

    if (matchedCards.length === cards.length / 2) {
        document.getElementById('result').innerText = 'Chúc mừng! Bạn đã thắng!';
    }
}

function initGame() {
    shuffleCards();

    const grid = document.getElementById('cardGrid');
    grid.innerHTML = ''; // Làm sạch grid

    cards.forEach(cardData => {
        const card = createCard(cardData);
        grid.appendChild(card);
    });
}

initGame(); // Bắt đầu game ngay khi trang load
