import { setFavorite, unsetFavorite } from "./js/logic.js";
import { getBooks } from "./js/data.js";
import { renderFavorite, renderBooks, changeMode } from "./js/ui.js";
import { globals } from "./js/globals.js";

document.addEventListener('click', (e) => {
    const favIcon = e.target.closest('.fav-icon');
    const favedIcon = e.target.closest('.icon-fix');
    const startSearch = e.target.id === 'startSearch';
    const toggleMode = e.target.closest('.mode-change');

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

    if (toggleMode) {
        changeMode();
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const savedSearchResults = JSON.parse(localStorage.getItem('resultsArray'));
    const currentMode = localStorage.getItem('mode');

    if (currentMode === 'dark') {
        document.documentElement.setAttribute('data-mode', 'dark');
    }

    if (savedSearchResults) {
        renderBooks(savedSearchResults);
    }

    renderFavorite();
})

// debounce
document.querySelector("#input").addEventListener('change', (e) => {

    clearTimeout(globals.timer);
    globals.timer = setTimeout(() => {
        const searchQuery = e.target.value;
        if (searchQuery === '') {
            return;
        } else {
            getBooks(searchQuery);
        }
    }, 100)
}
)