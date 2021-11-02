const newBookBtn = document.querySelector('.header__new-book-btn');
const cancelBtn = document.querySelector('.new-book-window__btn-container__cancel-btn');
const newBookWindow = document.querySelector('.new-book-window');

//YOUR NEW BOOK INPUTS
const authorInput = document.querySelector('.new-book-window__author-input');
const titleInput = document.querySelector('.new-book-window__title-input');
const statusInput = document.querySelector('.new-book-window__status-input');
const ratingInput = document.querySelector('.new-book-window__rating-input');
const pageInput = document.querySelector('.new-book-window__page-input');
const yearInput = document.querySelector('.new-book-window__year-input');
const genreInput = document.querySelector('.new-book-window__genre-input');
const noteInput = document.querySelector('.new-book-window__note-input');

newBookBtn.addEventListener('click', openNewBookWindow);
cancelBtn.addEventListener('click', closeNewBookWindow);

function openNewBookWindow() {
	newBookWindow.classList.remove('hidden');
}

function closeNewBookWindow() {
	newBookWindow.classList.add('hidden');
}
