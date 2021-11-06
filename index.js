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
newBookWindow.addEventListener('submit', e => {
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
		errorMessage.classList.add('animation-error');
		return;
	}

	const newBook = new Book();
	newBook.create(newBook);

	updateLocalStorage(newBook);
	populateList();
	cleanInputFields();
	closeNewBookWindow();
}

function toggleBookInfo(
	pStatus,
	pPage,
	spanPageInput,
	pRating,
	spanRatingInput,
	pYear,
	spanYearInput,
	pGenre,
	spanGenreInput,
	pNote,
	pNoteText
) {
	pStatus.classList.toggle('display-none');
	if (spanRatingInput.textContent !== '/10') {
		pRating.classList.toggle('display-none');
	}
	if (spanPageInput.textContent !== '') {
		pPage.classList.toggle('display-none');
	}
	if (spanYearInput.textContent !== '') {
		pYear.classList.toggle('display-none');
	}
	if (spanGenreInput.textContent !== '') {
		pGenre.classList.toggle('display-none');
	}
	if (pNoteText.textContent !== '') {
		pNote.classList.toggle('display-none');
		pNoteText.classList.toggle('display-none');
	}
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
	cleanColumns();
	// createBufferElement();
	// console.log(localStorage.lastChild);

	if (booksInStorage.length === 0) {
		return;
	}
	booksInStorage.map(book => {
		createBooksDOM(book);
	});
}

function createBooksDOM(newBook) {
	const divBookPlate = document.createElement('div');
	const pAuthor = document.createElement('p');
	const pTitle = document.createElement('p');
	const imgStatusIcon = document.createElement('img');

	const spanStatus = document.createElement('span');
	const spanStatusInput = document.createElement('span');
	const pStatus = document.createElement('p');

	const spanPage = document.createElement('span');
	const spanPageInput = document.createElement('span');
	const pPage = document.createElement('p');

	const spanRating = document.createElement('span');
	const spanRatingInput = document.createElement('span');
	const pRating = document.createElement('p');

	const spanYear = document.createElement('span');
	const spanYearInput = document.createElement('span');
	const pYear = document.createElement('p');

	const spanGenre = document.createElement('span');
	const spanGenreInput = document.createElement('span');
	const pGenre = document.createElement('p');

	const spanNote = document.createElement('span');
	const pNote = document.createElement('p');

	const pNoteText = document.createElement('p');

	pAuthor.textContent = newBook.author;
	pTitle.textContent = newBook.title;

	if (newBook.status === 'finished') {
		imgStatusIcon.src = '/icons/finished.svg';
	} else if (newBook.status === 'reading') {
		imgStatusIcon.src = '/icons/in-process.svg';
	} else if (newBook.status === 'stopped') {
		imgStatusIcon.src = '/icons/stopped.svg';
	} else {
		imgStatusIcon.src = '/icons/later.svg';
	}

	spanStatus.textContent = 'status:';
	spanStatusInput.textContent = newBook.status;

	spanPage.textContent = 'page:';
	spanPageInput.textContent = newBook.page;

	spanRating.textContent = 'rating:';
	spanRatingInput.textContent = `${newBook.rating}/10`;

	spanYear.textContent = 'read at:';
	spanYearInput.textContent = newBook.year;

	spanGenre.textContent = 'genre:';
	spanGenreInput.textContent = newBook.genre;

	spanNote.textContent = 'note:';

	pNoteText.textContent = newBook.note;

	divBookPlate.classList.add('book-container__book');
	divBookPlate.classList.add(`id${newBook.id}`);
	pAuthor.classList.add('book-container__book__author');
	pTitle.classList.add('book-container__book__title');
	imgStatusIcon.classList.add('book-container__book__status-icon');

	spanStatus.classList.add('span');
	pStatus.classList.add('book-container__book__status');
	pStatus.classList.add('text-block');
	pStatus.classList.add('display-none');

	spanPage.classList.add('span');
	pPage.classList.add('book-container__book__page');
	pPage.classList.add('text-block');
	pPage.classList.add('display-none');

	spanRating.classList.add('span');
	pRating.classList.add('book-container__book__rating');
	pRating.classList.add('text-block');
	pRating.classList.add('display-none');

	spanYear.classList.add('span');
	pYear.classList.add('book-container__book__read');
	pYear.classList.add('text-block');
	pYear.classList.add('display-none');

	spanGenre.classList.add('span');
	pGenre.classList.add('book-container__book__genre');
	pGenre.classList.add('text-block');
	pGenre.classList.add('display-none');

	spanNote.classList.add('span');
	pNote.classList.add('book-container__book__note');
	pNote.classList.add('display-none');

	pNoteText.classList.add('book-container__book__note-text');
	pNoteText.classList.add('display-none');

	pStatus.appendChild(spanStatus);
	pStatus.appendChild(spanStatusInput);

	pPage.appendChild(spanPage);
	pPage.appendChild(spanPageInput);

	pRating.appendChild(spanRating);
	pRating.appendChild(spanRatingInput);

	pYear.appendChild(spanYear);
	pYear.appendChild(spanYearInput);

	pGenre.appendChild(spanGenre);
	pGenre.appendChild(spanGenreInput);

	pNote.appendChild(spanNote);

	divBookPlate.appendChild(pAuthor);
	divBookPlate.appendChild(pTitle);
	divBookPlate.appendChild(imgStatusIcon);
	divBookPlate.appendChild(pStatus);
	divBookPlate.appendChild(pPage);
	divBookPlate.appendChild(pRating);
	divBookPlate.appendChild(pYear);
	divBookPlate.appendChild(pGenre);
	divBookPlate.appendChild(pNote);
	divBookPlate.appendChild(pNoteText);

	chooseColumn(divBookPlate);

	if (newBook === booksInStorage[0]) {
		divBookPlate.classList.add('animation');
	}

	divBookPlate.addEventListener('click', () => {
		showHeight(divBookPlate);
	});

	divBookPlate.addEventListener('click', () => {
		toggleBookInfo(
			pStatus,
			pPage,
			spanPageInput,
			pRating,
			spanRatingInput,
			pYear,
			spanYearInput,
			pGenre,
			spanGenreInput,
			pNote,
			pNoteText
		);
	});
}

function showHeight(divBookPlate) {
	// console.log('last', booksContainerColumn1.lastChild.offsetTop);
	// console.log('first', booksContainerColumn1.firstChild.offsetTop);
	// console.log('cl2', booksContainerColumn2.lastChild.offsetTop);
}

function chooseColumn(divBookPlate) {
	if (!booksContainerColumn1.lastChild) {
		booksContainerColumn1.appendChild(divBookPlate);
	} else if (!booksContainerColumn2.lastChild) {
		booksContainerColumn2.appendChild(divBookPlate);
	} else if (!booksContainerColumn3.lastChild) {
		booksContainerColumn3.appendChild(divBookPlate);
	} else if (!booksContainerColumn4.lastChild) {
		booksContainerColumn4.appendChild(divBookPlate);
	} else if (!booksContainerColumn5.lastChild) {
		booksContainerColumn5.appendChild(divBookPlate);
	} else if (!booksContainerColumn6.lastChild) {
		booksContainerColumn6.appendChild(divBookPlate);
	} else if (
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn1.appendChild(divBookPlate, booksContainerColumn1.firstChild);
	} else if (
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn2.appendChild(divBookPlate, booksContainerColumn2.firstChild);
	} else if (
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn3.appendChild(divBookPlate, booksContainerColumn3.firstChild);
	} else if (
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn4.appendChild(divBookPlate, booksContainerColumn4.firstChild);
	} else if (
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn5.appendChild(divBookPlate, booksContainerColumn5.firstChild);
	} else if (
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop
	) {
		booksContainerColumn6.appendChild(divBookPlate, booksContainerColumn6.firstChild);
	}
}

function updateLocalStorage(newBook) {
	booksInStorage.unshift(newBook);
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

function cleanColumns() {
	booksContainerColumn1.innerHTML = '';
	booksContainerColumn2.innerHTML = '';
	booksContainerColumn3.innerHTML = '';
	booksContainerColumn4.innerHTML = '';
	booksContainerColumn5.innerHTML = '';
	booksContainerColumn6.innerHTML = '';
}

function createBufferElement() {
	booksContainerColumn1.appendChild(document.createElement('div'));
	booksContainerColumn2.appendChild(document.createElement('div'));
	booksContainerColumn3.appendChild(document.createElement('div'));
	booksContainerColumn4.appendChild(document.createElement('div'));
	booksContainerColumn5.appendChild(document.createElement('div'));
	booksContainerColumn6.appendChild(document.createElement('div'));
}

populateList();
