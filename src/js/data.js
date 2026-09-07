import { globals } from "./globals.js";
import { renderBooks } from "./ui.js";

export async function getBooks(q) {

    let booksArray;
    document.querySelector('.loading').classList.remove('hidden');
    document.querySelector('body').classList.add('loading-cursor');

    try {
        const query = new URLSearchParams({ q: q });
        const params = query.toString();
        const fetchBooks = await fetch(`https://openlibrary.org/search.json?${params}`); // make url a var later
        const books = await fetchBooks.json();

        if (!fetchBooks.ok) {
            globals.fetchStatus = 'error';
        } else {
            booksArray = books.docs || [];
            console.log(booksArray);

            if (booksArray.length === 0) {
                globals.fetchStatus = 'no-results';
            } else {
                globals.fetchStatus = 'fine';
                localStorage.setItem('resultsArray', JSON.stringify(booksArray));
            }
        }

    } catch (err) {
        console.log(err);
        globals.fetchStatus = 'error';
    } finally {
        document.querySelector('.loading').classList.add('hidden');
        document.querySelector('body').classList.remove('loading-cursor');
    }

    renderBooks(booksArray);

}
