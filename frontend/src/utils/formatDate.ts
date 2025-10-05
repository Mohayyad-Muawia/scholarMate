const formatDate = (date: Date | undefined) => {
  if (!date) return "غير محدد";
  const formattedDate = new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
  return formattedDate;
};

export default formatDate;
