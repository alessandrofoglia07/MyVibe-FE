/**
 * @param date - The date to format.
 * @returns String in the format DD/MM/YYYY
 */
const formatDate = (date: Date): string => {
    const d = new Date(date);
    const day = d.getUTCDate() < 10 ? '0' + d.getUTCDate() : d.getUTCDate();
    const month = d.getUTCMonth() + 1 < 10 ? '0' + (d.getUTCMonth() + 1) : d.getUTCMonth() + 1;
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
};

export default formatDate;