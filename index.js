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

const newBook = new Book();

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
	newBook.create(newBook);

	updateLocalStorage(newBook);
	populateList();
	cleanInputFields();
	closeNewBookWindow();
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
	this.create = function(newBook) {
		createBooksDOM(newBook);
		return;
	};
}

function populateList() {
	booksContainer.innerHTML = '';
	if (booksInStorage.length === 0) {
		return;
	}
	booksInStorage.map(book => createDom(book));
}

function createBooksDOM(newBook) {
	const divBookPlate = document.createElement('div');
	const pTitle = document.createElement('p');
	const pAuthor = document.createElement('p');
	const imgStatusIcon = document.createElement('img');

	const pStatus = document.createElement('p');
	const spanStatus = document.createElement('span');
	const spanStatusInput = document.createElement('span');

	const pPage = document.createElement('p');
	const spanPage = document.createElement('span');
	const spanPageInput = document.createElement('span');

	const pRating = document.createElement('p');
	const spanRating = document.createElement('span');
	const spanRatingInput = document.createElement('span');

	const pYear = document.createElement('p');
	const spanYear = document.createElement('span');
	const spanYearInput = document.createElement('span');

	const pGenre = document.createElement('p');
	const spanGenre = document.createElement('span');
	const spanGenreInput = document.createElement('span');

	const pNote = document.createElement('p');
	const spanNote = document.createElement('span');

	const pNoteText = document.createElement('p');
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

function createID() {
	const randomID = Math.floor(Math.random() * 1000000000000000000000);
	return randomID;
}

populateList();

//////////////////
// const divBookPlate = document.createElement('div');
// const pStatus = document.createElement('p');
// const pSpan = document.createElement('span');
// const inputSpan = document.createElement('span');

// span.textContent = 'status:';
// span.classList.add('span');

// pStatus.appendChild(span);

// inputSpan.textContent = statusInput.value;

// pStatus.appendChild(inputSpan);

// const authorString = 'author:';
// authorString.fontcolor('#af4b31');

// divBookPlate.classList.add('book-container__book');
// pStatus.classList.add('book-container__book__status');

// divBookPlate.appendChild(pStatus);
// booksContainer.appendChild(divBookPlate);

//////////////////////
// author, title, status, rating, page, year, genre, note, id

//////////////////////
// function createDom(newBook) {
//   const divBookPlate = document.createElement('div');
//   const pAuthor = document.createElement('p');

//   pAuthor.textContent = newBook.author;

//   divBookPlate.classList.add('book-container__book');
//   pAuthor.classList.add('book-container__book__author');

//   divBookPlate.appendChild(pAuthor);

//   booksContainer.appendChild(divBookPlate);
// }
