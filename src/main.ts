import { menu } from './assets/data/menu';
import { addToCart } from './cart';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
        <header class="header">
          <h1 class="header-title">Jimmy's Diner</h1>
          <h2>The best burgers and pizzas in town</h2>
        </header>
        <main id="main-content"></main>
        `;

export const mainContent = document.querySelector('#main-content');
const cards = document.createElement('section');
cards.classList.add('cards');

menu.forEach((card) => {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');

  const cardImgWrap = document.createElement('div');
  cardImgWrap.classList.add('card-img-wrap');
  const cardImg = document.createElement('img');

  cardImg.classList.add('card-img');
  cardImg.id = card.name;
  cardImg.src = `/images/${card.img}`;
  cardImg.alt = `A delicious cartoon ${card.name}`;

  cardImgWrap.append(cardImg);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const cardTitle = document.createElement('h2');
  cardTitle.textContent = card.name;

  const cardIngredients = document.createElement('p');
  cardIngredients.textContent = card.ingredients.join(', ');
  cardIngredients.id = 'card-ingredients';

  const cardPrice = document.createElement('p');
  cardPrice.textContent = `$${card.price.toString()}`;

  cardInfo.append(cardTitle, cardIngredients, cardPrice);

  const cardAddBtn = document.createElement('button');
  cardAddBtn.classList.add('card-add-btn');
  cardAddBtn.dataset.item = card.uuid;
  cardAddBtn.addEventListener('click', addToCart);

  const cardAddBtnImg = document.createElement('img');
  cardAddBtnImg.id = 'btn-img';
  cardAddBtnImg.src = '/images/plus.svg';
  cardAddBtnImg.alt = 'plus icon';
  cardAddBtn.append(cardAddBtnImg);

  cardContent.append(cardImgWrap, cardInfo, cardAddBtn);
  cardEl.append(cardContent);
  cards.append(cardEl);
});

mainContent?.append(cards);
