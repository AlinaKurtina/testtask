import { setFavorite, unsetFavorite } from "./js/logic.js";
import { getBooks } from "./js/data.js";
import { renderFavorite, renderBooks } from "./js/ui.js";

document.addEventListener('click', (e) => {
    const favIcon = e.target.closest('.fav-icon');
    const favedIcon = e.target.closest('.icon-fix');
    const startSearch = document.querySelector('#startSearch');

    if (favIcon) {
        setFavorite(e);
    }

    if (favedIcon) {
        unsetFavorite(e);
    }

    if (startSearch) {
        const searchQuery = document.querySelector("#input").value;
        if (searchQuery === '') {
            return;
        } else {
            getBooks(searchQuery);

        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const savedSearchResults = JSON.parse(localStorage.getItem('resultsArray'));

    if (savedSearchResults) {
        renderBooks(savedSearchResults);
    }

    renderFavorite();
})
