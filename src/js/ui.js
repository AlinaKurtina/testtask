import { globals } from "./globals.js";

export function renderBooks(books) {
    const booksContainer = document.querySelector(".books-div");
    const spanContainer = document.querySelector(".books-favorites");
    const emptySpan = document.querySelector(".empty");
    const faved = JSON.parse(localStorage.getItem('favorites'));

    const statusSpan = document.createElement('span');
    statusSpan.classList.add('empty');

    if (emptySpan) {
        emptySpan.remove();
    }

    switch (globals.fetchStatus) {
        case 'error':
            statusSpan.textContent = 'Network problems occured. Please, retry.';
            spanContainer.prepend(statusSpan);
            break;

        case 'no-results':
            statusSpan.textContent = 'No results found for your query.';
            spanContainer.prepend(statusSpan);
            break;
        default:
            break;
    }

    booksContainer.innerHTML = books.map((book, bookIndex) => {
        const faveBook = faved.find(fav => fav.key === book.key);
        const isFaved = faved.includes(faveBook);
        return `
        <div class="book-entry" id=${bookIndex} key=${book.key}>
                ${book.cover_i ?
                `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="book-cover" alt="">`
                :
                `<div class="book-cover-placeholder">No cover available</div>`}
                <div class="book-info">
                    <span class="book-title">${book.title || 'Unknown Title'}</span>
                    <span class="book-author">${book.author_name || 'Unkbown Author'}</span>
                    <span class="book-year">${book.first_publish_year || 'Unknown Year'}</span>
                    <svg class="fav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="${isFaved ? 'red' : 'none'}" stroke="${isFaved ? 'red' : 'black'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78l1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </div>
        </div>
    `
    }).join("");
}

export function renderFavorite() {
    const favDiv = document.querySelector('.favs-list');
    const favsArr = JSON.parse(localStorage.getItem('favorites'));
    const favsCount = document.querySelector('#count');

    favDiv.innerHTML = favsArr.map(fav => `
        <div class="fav-entry" key=${fav.key}>
                    <hr>
                    <div class="no-hr">
                        ${fav.coverSrc ? `<img src="https://covers.openlibrary.org/b/id/${fav.coverSrc}.jpg" class="fav-cover" alt="">` :
            `<div class="fav-cover-placeholder"><p>No cover available</p></div>`}
                        <div class="fav-info">
                            <span class="fav-title">${fav.title}</span>
                            <span class="fav-author">${fav.author}</span>
                            <span class="fav-year">${fav.year}</span>
                            <svg class="icon-fix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78l1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </div>
                    </div>
        </div>
        `).join('');

    if (favsArr.length === 0) {
        let span = document.createElement('span');
        span.textContent = "You haven't added any favorite books yet."
        span.classList.add('empty-favs');
        favDiv.append(span);
    }

    favsCount.textContent = favsArr.length;

}

export function changeMode() {
    const mode = document.documentElement.getAttribute('data-mode') || null;

    if (mode === 'dark') {
        document.documentElement.removeAttribute('data-mode');
        localStorage.setItem('mode', 'light');
    } else {
        document.documentElement.setAttribute('data-mode', 'dark');
        localStorage.setItem('mode', 'dark');
    }

}