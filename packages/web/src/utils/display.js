const options = { style: 'decimal', maximumSignificantDigits: 1 };

export const money = money => money.toLocaleString(undefined, options);

export const daysSince = isoDate => {
  const now = new Date();
  const end = now - new Date(isoDate);

  return Math.round(end / (1000 * 60 * 60 * 24));
};

export const hoursSince = isoDate => {
  const now = new Date();
  const end = now - new Date(isoDate);

  return Math.round(end / (1000 * 60 * 60));
};
