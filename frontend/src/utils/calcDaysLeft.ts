const calculateDaysLeft = (deadline: Date) => {
  const today = new Date();
  const diff = new Date(deadline).getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) {
    return "انتهى التقديم";
  } else if (days == 0) {
    return "ينتهي اليوم";
  } else if (days == 1) {
    return "يوم";
  } else if (days == 2) {
    return "يومين";
  } else if (days >= 3 && days < 11) {
    return `${days} ايام`;
  } else if (days >= 11) {
    return `${days} يوم`;
  } else {
    return `${days} يوم`;
  }
};

export default calculateDaysLeft;
