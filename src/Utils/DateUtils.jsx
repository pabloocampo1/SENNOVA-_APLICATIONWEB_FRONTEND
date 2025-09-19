export const formatMonth = (date, locale = "es-ES") => {
    const monthName = date.toLocaleString(locale, { month: "long" });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

export const formatMonthYear = (date, locale = "es-ES") => {
    const monthName = formatMonth(date, locale);
    return `${monthName} ${date.getFullYear()}`;
};
