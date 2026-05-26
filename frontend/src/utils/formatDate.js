export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}