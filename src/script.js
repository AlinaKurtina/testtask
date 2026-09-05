// globals (UNGLOBAL LATER)


// fetch and save da books

async function getBooks(q) {
    const query = new URLSearchParams({ q: q });
    const params = query.toString();
    const fetchBooks = await fetch(`https://openlibrary.org/search.json?${params}`); // make url a var later
    const books = await fetchBooks.json();
    const booksArray = books.docs;

    localStorage.setItem('resultsArray', JSON.stringify(booksArray));
    return booksArray;
}

async function renderBooks(q) {
    const books = await getBooks(q);
    const booksContainer = document.querySelector(".books-div");
    const emptySpan = document.querySelector(".empty");

    if (emptySpan) {
        emptySpan.remove();
    }

    booksContainer.innerHTML = books.map((book, bookIndex) => `
        <div class="book-entry" id=${bookIndex} key=${book.key}>
                ${book.cover_i ?
            `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="book-cover" alt="">`
            :
            `<div class="book-cover-placeholder">No cover available</div>`}
                <div class="book-info">
                    <span class="book-title">${book.title || 'Unknown Title'}</span>
                    <span class="book-author">${book.author_name || 'Unkbown Author'}</span>
                    <span class="book-year">${book.first_publish_year || 'Unknown Year'}</span>
                    <img src="/assets/heart.svg" alt="fav-icon" class="fav-icon">
                </div>
        </div>
    `).join("");
}

document.querySelector("#startSearch").addEventListener('click', () => {
    const searchQuery = document.querySelector("#input").value;

    if (searchQuery === '') {
        return;
    } else {
        renderBooks(searchQuery);
    }
})

// add books to favorites

function setFavorite(e) {
    const key = e.target.closest(".book-entry").getAttribute('key');
    const faved = localStorage.getItem('favorites');
    const bookArray = JSON.parse(localStorage.getItem('resultsArray'));
    const book = bookArray.find(book => book.key === key);

    const favedBook = {
        coverSrc: book.cover_i,
        title: book.title,
        author: book.author,
        year: book.first_publish_year
    }

    if (!faved) { // NOT FINISHED
        let arr = [];
        arr.push(favedBook);
        localStorage.setItem('favorites', JSON.stringify(arr));
    } else if (faved && !book) {
        const favedArr = JSON.parse(faved);
        favedArr.push(favedBook);
        localStorage.setItem('favorites', JSON.stringify(favedArr));
    }

}

function renderFavorite() {
    const favDiv = document.querySelector('.favorites-div');
    const favsArr = JSON.parse(localStorage.getItem('favorites'));
    const emptyFavSpan = document.querySelector('.empty-favs');

    if (emptyFavSpan) {
        emptyFavSpan.remove();
    }

    favDiv.innerHTML = favsArr.map(fav => `
        <div class="fav-entry">
                    <hr>
                    <div class="no-hr">
                        ${fav.coverSrc ? `<div class="fav-cover-placeholder"><p>No cover available</p></div>` :
                        `<img src="https://covers.openlibrary.org/b/id/${fav.coverSrc}.jpg" alt="">`}
                        <div class="fav-info">
                            <span class="fav-title">${fav.title}</span>
                            <span class="fav-author">${fav.author}</span>
                            <span class="fav-year">${fav.year}</span>
                            <img src="/assets/heart.svg" alt="fav-icon" class="fav-icon icon-fix">
                        </div>
                    </div>
                </div>
        `).join('');
}

document.querySelector(".books-div").addEventListener('click', (e) => {
    const favIcon = e.target.closest('.fav-icon');
    if (favIcon) {
        setFavorite(e);
        renderFavorite();
    }
})
