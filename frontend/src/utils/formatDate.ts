const formatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
  return formattedDate;
};

export default formatDate;
