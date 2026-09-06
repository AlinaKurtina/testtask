import { renderFavorite, renderBooks } from "./ui.js";

export function setFavorite(e) {
    const key = e.target.closest(".book-entry").getAttribute('key');
    const faved = JSON.parse(localStorage.getItem('favorites')); // make a global
    const bookArray = JSON.parse(localStorage.getItem('resultsArray')); // globalify
    const book = bookArray.find(book => book.key === key);
    const faveBook = faved.find(fav => fav.key === key);
    const isFaved = faved.includes(faveBook);

    const favedBook = {
        key: book.key,
        coverSrc: book.cover_i,
        title: book.title,
        author: book.author_name,
        year: book.first_publish_year
    }

    if (!faved) {
        let arr = [];
        arr.push(favedBook);
        localStorage.setItem('favorites', JSON.stringify(arr));
    } else if (faved && !isFaved) {
        faved.push(favedBook);
        localStorage.setItem('favorites', JSON.stringify(faved));
    } else {
        const filtered = faved.filter(fav => fav.key !== faveBook.key);
        localStorage.setItem('favorites', JSON.stringify(filtered));
    }

    renderFavorite();
    renderBooks(bookArray);

}

export function unsetFavorite(e) {
    const key = e.target.closest(".fav-entry").getAttribute('key');
    const faved = JSON.parse(localStorage.getItem('favorites'));
    const filtered = faved.filter(fav => fav.key !== key);
    const books = JSON.parse(localStorage.getItem('resultsArray'));
    localStorage.setItem('favorites', JSON.stringify(filtered));

    renderFavorite();
    renderBooks(books);
}