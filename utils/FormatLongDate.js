export const formatLongDate = (dateStr) => {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
};
