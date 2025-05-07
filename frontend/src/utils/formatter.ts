export function formatDate(date: Date): string {
    if (!date) return '';
    
    // Format as DD.MM.YYYY for Estonian locale
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }