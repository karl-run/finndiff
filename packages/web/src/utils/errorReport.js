export const reportClientError = (description, info) => {
  fetch('/api/uh-oh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: description,
      info,
    }),
  });
};
