export type Currency = {name: string; shorthand: string; symbol: string};

export const currencyList: Currency[] = [
  {name: 'Euro', shorthand: 'EUR', symbol: '€'},
  {name: 'US Dollar', shorthand: 'USD', symbol: '$'},
  {name: 'New Zealand Dollar', shorthand: 'NZD', symbol: '$'},
  {name: 'Australian Dollar', shorthand: 'AUD', symbol: '$'},
  {name: 'British Pound', shorthand: 'GBP', symbol: '£'},
  {name: 'Chinese Yuan', shorthand: 'CNY', symbol: '元'},
  {name: 'Japanese Yen', shorthand: 'YEN', symbol: '¥'},
  {name: 'Swiss Franc', shorthand: 'CHF', symbol: '€'},
  {name: 'Indian Rupee', shorthand: 'INR', symbol: '₹'},
  {name: 'Singapur Dollar', shorthand: 'SGD', symbol: '$'},
  {name: 'Swedish Krona', shorthand: 'SEK', symbol: 'kr'},
  {name: 'Norwegian Krona', shorthand: 'NOK', symbol: 'kr'},
];