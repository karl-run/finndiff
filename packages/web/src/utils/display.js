const options = { style: 'decimal', maximumSignificantDigits: 1 };

export const money = (money) => money.toLocaleString(undefined, options);
