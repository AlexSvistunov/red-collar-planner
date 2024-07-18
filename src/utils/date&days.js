const countDays = (date) => {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const weekDate = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  return {
    weekDate,
    hours,
    minutes,
    time,
    day,
    month
  }
};

export default countDays
