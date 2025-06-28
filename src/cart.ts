import { menu, currentCart, type menuItem } from './assets/data/menu';
import { renderPaymentForm } from './form';
import { mainContent } from './main';
import './style.css';

const isCartEmpty = currentCart.length === 0;

export function addToCart(e: MouseEvent): void {
  e.stopPropagation();
  const targetBtn = e.currentTarget as HTMLButtonElement;
  if (targetBtn?.dataset.item) {
    const menuObj = menu.find(
      (item) => item.uuid === targetBtn.dataset.item
    );
    menuObj && currentCart.push(menuObj);
  }

  markInCart(targetBtn);
  renderCart(currentCart);
}

export function markInCart(el: HTMLButtonElement) {
  currentCart.some((cartItem) => cartItem.uuid === el.dataset.item)
    ? el.classList.add('in-cart')
    : el.classList.remove('in-cart');
}

export function removeFromCart(e: MouseEvent) {
  const target = e.currentTarget as HTMLButtonElement;
  const cartObjIndx = currentCart.findIndex(
    (item) => item.uuid === target.dataset.btnId
  );

  const removedItem = currentCart[cartObjIndx];
  currentCart.splice(cartObjIndx, 1);

  // Find the right button to check for potential colour change
  const itemAddBtn = document.querySelector<HTMLButtonElement>(
    `.card-add-btn[data-item="${removedItem.uuid}"]`
  );
  console.log(removedItem.uuid);
  if (itemAddBtn) {
    markInCart(itemAddBtn);
  }

  renderCart(currentCart);
}

export function resetOrder() {
  currentCart.splice(0, currentCart.length);

  let currentOrderContainer = document.querySelector(
    '.order-info'
  ) as HTMLElement;

  if (currentOrderContainer) {
    currentOrderContainer.classList.remove('show');
    // Wait for transition animation
    setTimeout(() => {
      currentOrderContainer.innerHTML = '';
    }, 400);
  }
}

export function renderCart(cartArray: menuItem[]) {
  const cartClass = isCartEmpty ? 'hidden' : '';
  let currentOrderContainer = document.querySelector(
    '.order-info'
  ) as HTMLElement;

  if (!currentOrderContainer) {
    currentOrderContainer = document.createElement('section');
    currentOrderContainer.classList.add('order-info', cartClass);
    mainContent?.append(currentOrderContainer);
  }

  currentOrderContainer.innerHTML = '';

  if (cartArray.length > 0) {
    const orderTitle = document.createElement('h2');
    orderTitle.textContent = 'Your Order';

    const cartContents = document.createElement('ul');
    cartContents.classList.add('cart-contents');

    cartArray.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('order-item');
      li.id = item.uuid;

      const orderItemwrap = document.createElement('div');
      orderItemwrap.classList.add('order-item-wrap');

      const itemBtnWrap = document.createElement('div');
      itemBtnWrap.classList.add('item-btn-wrap');

      const itemName = document.createElement('h2');
      itemName.textContent = item.name;

      const cartRemoveBtn = document.createElement('button');
      cartRemoveBtn.classList.add('cart-remove-btn');
      cartRemoveBtn.textContent = 'remove';
      cartRemoveBtn.dataset.btnId = item.uuid;
      cartRemoveBtn.addEventListener('click', removeFromCart);

      itemBtnWrap.append(itemName, cartRemoveBtn);

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `$${item.price.toString()}`;

      orderItemwrap.append(itemBtnWrap, itemPrice);

      li.append(orderItemwrap);
      cartContents.append(li);
    });

    const divLine = document.createElement('div');
    divLine.classList.add('div-line');

    const totalPriceWrap = document.createElement('div');
    totalPriceWrap.classList.add('total-price-wrap');

    const totalPriceText = document.createElement('h2');
    totalPriceText.textContent = 'Total price: ';

    const totalPrice = document.createElement('p');
    totalPrice.textContent = `$${cartArray
      .reduce((total, current) => {
        return total + current.price;
      }, 0)
      .toString()}`;

    totalPriceWrap.append(totalPriceText, totalPrice);

    const orderBtn = document.createElement('button');
    orderBtn.classList.add('order-btn');
    orderBtn.textContent = 'Complete order';
    orderBtn.addEventListener('click', renderPaymentForm);

    // Add page height to avoid jumping on order section creation
    const tallDiv = document.createElement('div');
    tallDiv.classList.add('tall-div');

    currentOrderContainer.append(
      orderTitle,
      cartContents,
      divLine,
      totalPriceWrap,
      orderBtn,
      tallDiv
    );
  }

  currentOrderContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });

  requestAnimationFrame(() => {
    currentOrderContainer.classList.add('show');
  });
}
