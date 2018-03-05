const options = { style: 'decimal', maximumSignificantDigits: 1 };

export const money = money => money.toLocaleString(undefined, options);

export const daysSince = (isoDate, since = new Date()) => {
  const end = since - new Date(isoDate);

  return Math.round(end / (1000 * 60 * 60 * 24));
};

export const hoursSince = (isoDate, since = new Date()) => {
  const end = since - new Date(isoDate);

  return Math.round(end / (1000 * 60 * 60));
};
