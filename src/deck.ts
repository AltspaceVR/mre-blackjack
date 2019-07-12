
 export  default class Deck {
        constructor() {
          let deck = [];
      
          const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
          const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
      
          for (let suit in suits) {
            for (let value in values) {
              deck.push(`${values[value]} of ${suits[suit]}`);
            }
          }
        }
      }
      
