export const validateWords = (fieldName: string, value: string, minLength: number, maxLength: number) => {
    const words = value.trim().split(/\s+/);
    if (words.length === 0 && value.trim() !== '') {
        // Handle case where there are spaces but no words
        return `Please enter at least ${minLength} ${fieldName} words.`;
    }
    if (words.length < minLength) {
        return `${fieldName} requires at least ${minLength} words.`;
    } else if (words.length > maxLength) {
        return `No more than ${maxLength} words are allowed for ${fieldName}.`;
    } else {
        return true; // No errors
    }
};
export const validateNumber = (fieldName: string, value: string) => {
    const convertedNumber = Number(value);
    if (isNaN(convertedNumber)) {
        return 'Please enter a valid number.';
    } else if (convertedNumber === 0) {
        return `Zero is not allowed for ${fieldName}.`;
    } else if (convertedNumber > 1000) {
        return `The maximum allowed number for ${fieldName} is 1000.`;
    } else {
        return true; // No errors
    }
};
export const truncateText = (value: string, maxLength: number): string => {
    const words = value.trim().split(" ");
    if (words.length > maxLength) {
        const truncatedWords = words.slice(0, maxLength).join(" ");
        return `${truncatedWords}...`;
    } else {
        return value;
    }
}
export const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
        return date;
    } else if (date instanceof Date) {
        return date.toLocaleString()
    } else {
        return "Invalid Date"
    }
}