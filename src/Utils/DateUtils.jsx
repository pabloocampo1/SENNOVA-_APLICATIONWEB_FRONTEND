export const formatMonth = (date, locale = "es-ES") => {
    const monthName = date.toLocaleString(locale, { month: "long" });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

export const formatMonthYear = (date, locale = "es-ES") => {
    const monthName = formatMonth(date, locale);
    return `${monthName} ${date.getFullYear()}`;
};

export function isSameDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function formatDateTime(isoString) {
    if (!isoString) return "";

    try {
        const date = new Date(isoString);

        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };

        return date.toLocaleString("es-CO", options);
    } catch (error) {
        console.error("❌ Error formateando fecha:", error);
        return isoString;
    }
}

export const getDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    const diff = due - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days;
};

export function timeAgo(isoString) {
    if (!isoString) return "";
    const date = new Date(isoString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `hace ${seconds} segundos`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)
        return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `hace ${days} ${days === 1 ? "día" : "días"}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
    const years = Math.floor(months / 12);
    return `hace ${years} ${years === 1 ? "año" : "años"}`;
}
