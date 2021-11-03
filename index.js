//LOCAL STORAGE
let booksInStorage = JSON.parse(localStorage.getItem('booksInStorage')) || [];

//BUTTONS
const newBookBtn = document.querySelector('.header__new-book-btn');
const cancelBtn = document.querySelector('.new-book-window__btn-container__cancel-btn');
const addNewBookBtn = document.querySelector('.new-book-window__btn-container__add-new-book-btn');
const logoBookshelfBtn = document.querySelector('.header__side__bookshelf-btn');

//FILTERS
const finishedBooksBtn = document.querySelector('.header__side__finished');
const inProcessBooksBtn = document.querySelector('.header__side__in-process');
const stoppedBooksBtn = document.querySelector('.header__side__stopped');
const laterBooksBtn = document.querySelector('.header__side__later');

//NEW BOOK WINDOW
const newBookWindow = document.querySelector('.new-book-window');
const errorMessage = document.querySelector('.new-book-window__error-message');

const authorInput = document.querySelector('.new-book-window__author-input');
const titleInput = document.querySelector('.new-book-window__title-input');
const statusInput = document.querySelector('.new-book-window__status-input');
const ratingInput = document.querySelector('.new-book-window__rating-input');
const pageInput = document.querySelector('.new-book-window__page-input');
const yearInput = document.querySelector('.new-book-window__year-input');
const genreInput = document.querySelector('.new-book-window__genre-input');
const noteInput = document.querySelector('.new-book-window__note-input');

//SEARCHBAR
const searchbar = document.querySelector('.header__search-bar');

//BOOKS CONTAINER
const booksContainer = document.querySelector('.book-container');
const booksContainerColumn1 = document.querySelector('.book-container__column1');
const booksContainerColumn2 = document.querySelector('.book-container__column2');
const booksContainerColumn3 = document.querySelector('.book-container__column3');
const booksContainerColumn4 = document.querySelector('.book-container__column4');
const booksContainerColumn5 = document.querySelector('.book-container__column5');
const booksContainerColumn6 = document.querySelector('.book-container__column6');

//EVENTS
newBookBtn.addEventListener('click', openNewBookWindow);
cancelBtn.addEventListener('click', closeNewBookWindow);
logoBookshelfBtn.addEventListener('click', scrollToTop);
addNewBookBtn.addEventListener('click', e => {
	addBookToLibrary(e);
});

//EVENT FUNCTIONS
function openNewBookWindow() {
	newBookWindow.classList.remove('hidden');
}

function closeNewBookWindow() {
	newBookWindow.classList.add('hidden');
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addBookToLibrary(e) {
	e.preventDefault();

	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}

	if (!authorInput.value || !titleInput.value) {
		errorMessage.classList.remove('hidden');
	}

	const newBook = new Book();

	updateLocalStorage(newBook);
	cleanInputFields();
	closeNewBookWindow();
	// populateList();
}

//OTHER FUNCTIONS
function Book() {
	this.author = authorInput.value;
	this.title = titleInput.value;
	this.status = statusInput.value;
	this.rating = ratingInput.value || '';
	this.page = pageInput.value || '';
	this.year = yearInput.value || '';
	this.genre = genreInput.value || '';
	this.note = noteInput.value || '';
	this.id = `${createID()}`;
}

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000000);
	return randomID;
}

function updateLocalStorage(newBook) {
	booksInStorage.push(newBook);
	localStorage.setItem('booksInStorage', JSON.stringify(booksInStorage));
}

function cleanInputFields() {
	authorInput.value = '';
	titleInput.value = '';
	statusInput.value = 'finished';
	ratingInput.value = '';
	pageInput.value = '';
	yearInput.value = '';
	genreInput.value = '';
	noteInput.value = '';
}

function populateList() {
	booksInStorage.map(book => createBooksDOM());
}

function createBooksDOM() {
	const divBookPlate = document.createElement('div');
	const pStatus = document.createElement('p');

	pStatus.textContent = `<span>author:</span> ${statusInput.value}`;

	divBookPlate.classList.add('book-container__book');
	divBookPlate.classList.add(`id${id}`);
	pStatus.classList.add('book-container__book__status');

	divBookPlate.appendChild(pStatus);
	booksContainer.appendChild(divBookPlate);
}

// function createNewBook(e) {
// e.preventDefault();

// if (!errorMessage.classList.contains('hidden')) {
// 	errorMessage.classList.add('hidden');
// }

// if (!authorInput.value || !titleInput.value) {
// 	errorMessage.classList.remove('hidden');
// }

// const author = authorInput.value;
// const title = titleInput.value;
// const status = statusInput.value;
// const rating = ratingInput.value || '';
// const page = pageInput.value || '';
// const year = yearInput.value || '';
// const genre = genreInput.value || '';
// const note = noteInput.value || '';
// const id = `${createID()}`;

// 	// updateLocalStorage(book);

// authorInput.value = '';
// titleInput.value = '';
// statusInput.value = 'finished';
// ratingInput.value = '';
// pageInput.value = '';
// yearInput.value = '';
// genreInput.value = '';
// noteInput.value = '';
// }
