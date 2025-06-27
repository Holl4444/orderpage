import { v4 as uuidv4 } from 'uuid';

export interface menuItem {
    name: string,
    ingredients: string[],
    price: number,
    img: string,
    uuid: string,
}

export const menu: menuItem[] = [
  {
    name: 'Pizza',
    ingredients: ['pepperoni', 'mushroom', 'mozarella'],
    price: 14,
    img: 'pizza.png',
    uuid: uuidv4(),
  },
  {
    name: 'Hamburger',
    ingredients: ['beef', 'cheese', 'lettuce'],
    price: 12,
    img: 'burger.png',
    uuid: uuidv4(),
  },
  {
    name: 'Beer',
    ingredients: ['grain', 'hops', 'yeast', 'water'],
    price: 12,
    img: 'beer.png',
    uuid: uuidv4(),
  },
];

export const currentCart: menuItem[] = [

]; 
