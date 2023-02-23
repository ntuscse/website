// Format date for display - e.g.: March 22, 2022
export const getDisplayDate = (date: Date) => {
  try {
    const dateObj = new Date(date);
    let displayDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
    }).format(dateObj);
    displayDate += `, ${dateObj.getFullYear()}`;

    return displayDate;
  } catch {
    return "";
  }
};
