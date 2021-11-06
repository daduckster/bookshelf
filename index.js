//LOCAL STORAGE
let booksInStorage = JSON.parse(localStorage.getItem('booksInStorage')) || [];

//BUTTONS
const newBookBtn = document.querySelector('.header__new-book-btn');
const cancelBtn = document.querySelector('.new-book-window__btn-container__cancel-btn');
let addNewBookBtn = document.querySelector('.new-book-window__btn-container__add-new-book-btn');
const logoBookshelfBtn = document.querySelector('.header__side__bookshelf-btn');

//FILTERS
const finishedBooksBtn = document.querySelector('.header__side__finished');
const inProcessBooksBtn = document.querySelector('.header__side__in-process');
const stoppedBooksBtn = document.querySelector('.header__side__stopped');
const laterBooksBtn = document.querySelector('.header__side__later');

//NEW BOOK WINDOW
let newBookWindow = document.querySelector('.new-book-window');
const newBookWindowName = document.querySelector('.new-book-window__window-name');
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

// const newBook = new Book();

//EVENTS
newBookBtn.addEventListener('click', openNewBookWindow);
cancelBtn.addEventListener('click', closeNewBookWindow);
logoBookshelfBtn.addEventListener('click', scrollToTop);

//EVENT FUNCTIONS
function openNewBookWindow() {
	addNewBookBtn.addEventListener('click', e => {
		addBookToLibrary(e);
	});
	newBookWindow.addEventListener('submit', e => {
		addBookToLibrary(e);
	});
	cleanInputFields();
	newBookWindow.classList.remove('hidden');
	newBookWindowName.textContent = 'Your New Book';
	addNewBookBtn.textContent = 'Add New Book';
}

function closeNewBookWindow() {
	newBookWindow.classList.add('hidden');
	cleanInputFields();
	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addBookToLibrary(e) {
	e.preventDefault();

	if (addNewBookBtn.textContent === 'Save Changes') {
		return;
	}

	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}

	if (!authorInput.value || !titleInput.value) {
		errorMessage.classList.remove('hidden');
		errorMessage.classList.add('animation-error');
		setTimeout(() => {
			errorMessage.classList.remove('animation-error');
		}, 500);
		return;
	}

	const newBook = new Book();

	updateLocalStorage(newBook);
	populateList();
	cleanInputFields();
	closeNewBookWindow();
}

function toggleBookInfo(
	btnDelete,
	btnEdit,
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
	btnDelete.classList.toggle('display-none');
	appear(btnDelete);
	btnEdit.classList.toggle('display-none');
	appear(btnEdit);
	pStatus.classList.toggle('display-none');
	appear(pStatus);

	if (spanRatingInput.textContent !== '/10') {
		pRating.classList.toggle('display-none');
		appear(pRating);
	}

	if (spanPageInput.textContent !== '') {
		pPage.classList.toggle('display-none');
		appear(pPage);
	}

	if (spanYearInput.textContent !== '') {
		pYear.classList.toggle('display-none');
		appear(pYear);
	}

	if (spanGenreInput.textContent !== '') {
		pGenre.classList.toggle('display-none');
		appear(pGenre);
	}

	if (pNoteText.textContent !== '') {
		pNote.classList.toggle('display-none');
		appear(pNote);
		pNoteText.classList.toggle('display-none');
		appear(pNoteText);
	}
}

function deleteBook(divBookPlate, btnDelete) {
	if (divBookPlate.classList.contains(`id${btnDelete.id}`)) {
		divBookPlate.classList.add('animation-deleted');
	}
	setTimeout(() => {
		const filteredBooks = booksInStorage.filter(book => book.id !== btnDelete.id);
		booksInStorage = filteredBooks;
		localStorage.setItem('booksInStorage', JSON.stringify(booksInStorage));
		populateList(true);
	}, 500);
}

function editBook(btnEdit, newBook) {
	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}
	const btnEditId = btnEdit.id;
	newBookWindow.classList.remove('hidden');
	newBookWindowName.textContent = 'Edit Your Book';
	addNewBookBtn.textContent = 'Save Changes';
	authorInput.value = newBook.author;
	titleInput.value = newBook.title;
	statusInput.value = newBook.status;
	ratingInput.value = newBook.rating || '';
	pageInput.value = newBook.page || '';
	yearInput.value = newBook.year || '';
	genreInput.value = newBook.genre || '';
	noteInput.value = newBook.note || '';
	addNewBookBtn.addEventListener('click', () => {
		saveChanges(btnEditId);
	});
}

function saveChanges(btnEditId) {
	if (addNewBookBtn.textContent !== 'Save Changes') {
		return;
	}
	if (!authorInput.value || !titleInput.value) {
		errorMessage.classList.remove('hidden');
		errorMessage.classList.add('animation-error');
		setTimeout(() => {
			errorMessage.classList.remove('animation-error');
		}, 500);
		return;
	}

	console.log('hi');
	const index = booksInStorage.findIndex(book => book.id === btnEditId);

	booksInStorage[index].author = authorInput.value;
	booksInStorage[index].title = titleInput.value;
	booksInStorage[index].status = statusInput.value;
	booksInStorage[index].rating = ratingInput.value || '';
	booksInStorage[index].page = pageInput.value || '';
	booksInStorage[index].year = yearInput.value || '';
	booksInStorage[index].genre = genreInput.value || '';
	booksInStorage[index].note = noteInput.value || '';

	localStorage.setItem('booksInStorage', JSON.stringify(booksInStorage));

	cleanInputFields();
	populateList(true);
	closeNewBookWindow();
	let newAddNewBookBtn = addNewBookBtn.cloneNode(true);
	let newBookWindow;
	addNewBookBtn.parentNode.replaceChild(newAddNewBookBtn, addNewBookBtn);
	addNewBookBtn = newAddNewBookBtn;
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

function populateList(isPageLoad = false) {
	cleanColumns();
	if (booksInStorage.length === 0) {
		return;
	}
	booksInStorage.map(book => {
		createBooksDOM(book, isPageLoad);
	});
}

function createBooksDOM(newBook, isPageLoad) {
	const divBookPlate = document.createElement('div');
	const btnContainer = document.createElement('div');
	const btnDelete = document.createElement('img');
	const btnEdit = document.createElement('img');
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

	btnDelete.src = '/icons/delete.svg';
	btnEdit.src = '/icons/edit.svg';
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

	btnDelete.id = newBook.id;
	btnEdit.id = newBook.id;

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
	btnContainer.classList.add('book-container__book__buttons');
	btnDelete.classList.add('book-container__book__buttons__delete');
	btnDelete.classList.add('display-none');
	btnEdit.classList.add('book-container__book__buttons__edit');
	btnEdit.classList.add('display-none');
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

	btnContainer.appendChild(btnEdit);
	btnContainer.appendChild(btnDelete);
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

	divBookPlate.appendChild(btnContainer);
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

	if (!isPageLoad && newBook === booksInStorage[0]) {
		divBookPlate.classList.add('animation');
		setTimeout(() => {
			divBookPlate.classList.remove('animation');
		}, 2500);
	}

	btnDelete.addEventListener('click', () => {
		deleteBook(divBookPlate, btnDelete);
	});

	btnEdit.addEventListener('click', () => {
		editBook(btnEdit, newBook);
	});

	divBookPlate.addEventListener('click', () => {
		toggleBookInfo(
			btnDelete,
			btnEdit,
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

function appear(element) {
	element.classList.add('animation-appear');
	setTimeout(() => {
		element.classList.remove('animation-appear');
	}, 500);
}
populateList(true);
