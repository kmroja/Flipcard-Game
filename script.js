const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
const winnerPopup = document.getElementById('winner-popup');

const images = [
  'https://img.freepik.com/premium-photo/st-valentine-s-day-concept-funny-puppy-dog-border-collie-red-heart-shaped-glasses-isolated-white-background-lovely-dog-love-celebrating-valentines-day-love-lovesick-romance-postcard_80942-11125.jpg?semt=ais_hybrid&w=740',
  'https://www.hdwallpapers.in/download/funny_pug_dog_face_expressions_hd_funny_dog-HD.jpg',
  'https://st.depositphotos.com/1625039/1746/i/450/depositphotos_17461085-stock-photo-funny-dachshund.jpg',
  'https://m.media-amazon.com/images/I/71-KbJCQfDL.jpg',
  'https://i.pinimg.com/236x/a6/8b/65/a68b65832660a3542ef1c65dfedcc9ec.jpg',
  'https://i.pinimg.com/236x/3e/62/3b/3e623bb9958051fc5b49891e07dfebdb.jpg',
  'https://images8.alphacoders.com/453/453856.jpg',
  'https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg'
];

let cardValues = [...images, ...images];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(imgSrc) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = imgSrc;

  const img = document.createElement('img');
  img.src = imgSrc;
  card.appendChild(img);

  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  });

  return card;
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);

    if (matchedCards.length === cardValues.length) {
      showWinner();
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];
}

function showWinner() {
  winnerPopup.style.display = 'block';
  confetti();
}

function setupGame() {
  board.innerHTML = '';
  winnerPopup.style.display = 'none';
  flippedCards = [];
  matchedCards = [];
  shuffle(cardValues);
  cardValues.forEach(value => {
    board.appendChild(createCard(value));
  });
}
function createCard(imgSrc) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const inner = document.createElement('div');
    inner.classList.add('card-inner');
  
    const front = document.createElement('div');
    front.classList.add('card-front');
  
    const back = document.createElement('div');
    back.classList.add('card-back');
    const img = document.createElement('img');
    img.src = imgSrc;
    back.appendChild(img);
  
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
  
    card.dataset.value = imgSrc;
  
    card.addEventListener('click', () => {
      if (
        flippedCards.length < 2 &&
        !card.classList.contains('flipped') &&
        !card.classList.contains('matched')
      ) {
        card.classList.add('flipped');
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          setTimeout(checkForMatch, 1000);
        }
      }
    });
  
    return card;
  }
  

restartBtn.addEventListener('click', setupGame);
setupGame();
