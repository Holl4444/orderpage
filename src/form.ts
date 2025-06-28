import { mainContent } from './main';
import { resetOrder } from './cart';
import './style.css';

document.addEventListener('click', (e: MouseEvent) => {
  const clickedEl = e.target as HTMLElement;
  const form = document.querySelector('#order-form');
  if (form && !form.contains(clickedEl)) {
    resetForm();
  }
});

function actionTransaction(e: SubmitEvent) {
  e.preventDefault();
  console.log('Transaction Attempted');

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get('name');

  let orderMessage = document.querySelector('.order-msg');

  if (!orderMessage) {
    orderMessage = document.createElement('div');
    orderMessage.classList.add('order-msg');
  }

  orderMessage.innerHTML = '';

  const message = document.createElement('p');
  message.textContent = `Thanks, ${
    name?.toString().split(' ')[0] || 'customer'
  }! Your order is on its way!`;

  orderMessage.appendChild(message);

  resetForm();
  resetOrder();
  mainContent?.append(orderMessage);
}

function resetForm() {
  const form = document.querySelector('.form-card');
  form?.remove();
}

// Note to self: Record<string, string> is like saying Object<string, string> but ofc Object is already in use.

function createInputs(
  type: string,
  id: string,
  name: string,
  placeholder: string,
  labelText?: string,
  dataset?: Record<string, string>,
  validation?: {
    required?: boolean;
    pattern?: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
  }
) {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = `${labelText}: `;
  label.classList.add('form-input-label');

  const input = document.createElement('input');
  Object.assign(input, {
    type,
    id,
    name,
    placeholder,
    className: 'form-input',
    ...validation,
  });

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      input.dataset[key] = value;
    });
  }
  // Format input for easier reading as typed
  if (id === 'creditcard') {
    let lastValue = '';

    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const currentValue = target.value;

      // Allow editing (only format when adding info)
      if (currentValue.length > lastValue.length) {
        let value = currentValue.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ');
        target.value = formattedValue.trim();
      }
      lastValue = target.value;
    });
  }

  return [label, input];
}

export function renderPaymentForm(e: MouseEvent) {
  // Prevent ordering triggering resetForm from document event listener
  e.stopPropagation();
  const formCard = document.createElement('form');
  formCard.method = 'POST';
  formCard.action = '';
  formCard.id = 'order-form';
  formCard.classList.add('form-card');
  formCard.addEventListener('submit', actionTransaction);

  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Enter Card details';

  const inputWrap = document.createElement('div');
  inputWrap.classList.add('input-wrap');

  const [nameLabel, nameInput] = createInputs(
    'text',
    'name',
    'name',
    'Bob Smith',
    'Full name',
    undefined,
    {
      required: true,
      pattern: '[A-Za-z\\s]+',
      title: 'Letters and spaces',
    }
  );

  const [creditcardLabel, creditcardInput] = createInputs(
    'text',
    'creditcard',
    'creditcard',
    '1367 5678 9285 3145',
    'Enter card number',
    undefined,
    {
      required: true,
      pattern: '[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}',
      title: 'Your 16 digit card number',
      minLength: 19,
      maxLength: 19,
    }
  );

  const [cvvLabel, cvvInput] = createInputs(
    'text',
    'cvv',
    'cvv',
    '789',
    'Enter CVV',
    undefined,
    {
      required: true,
      pattern: '[0-9]{3,4}',
      title: 'Your 3 digit CVV number',
      minLength: 3,
      maxLength: 4,
    }
  );

  const paymentBtn = document.createElement('button');
  paymentBtn.classList.add('payment-btn');
  paymentBtn.type = 'submit';
  paymentBtn.textContent = 'Pay';

  inputWrap.append(
    nameLabel,
    nameInput,
    creditcardLabel,
    creditcardInput,
    cvvLabel,
    cvvInput,
    paymentBtn
  );

  formCard.append(formTitle, inputWrap);

  mainContent?.append(formCard);
}
