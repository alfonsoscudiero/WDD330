document.addEventListener('DOMContentLoaded', () => {
    const copyrightYr = document.getElementById('current-year');
    const pageLastModified = document.getElementById('date-modified'); 

if (copyrightYr && pageLastModified) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${currentYear}`;

    copyrightYr.textContent = currentYear;
    pageLastModified.textContent = formattedDate;
}
});