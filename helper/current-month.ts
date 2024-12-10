export function getCurrentMonthRange(): { from: string; to: string } {
    const today = new Date();
    
    // Get the first day of the current month
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Format the date as YYYY-MM-DD
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    return {
        from: formatDate(firstDay),
        to: formatDate(today),
    };
}