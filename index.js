//LOCAL STORAGE
let booksInStorage = JSON.parse(localStorage.getItem('booksInStorage')) || [];

//BUTTONS
const newBookBtn = document.querySelector('.header__new-book-btn');
const cancelBtn = document.querySelector('.new-book-window__btn-container__cancel-btn');
let addNewBookBtn = document.querySelector('.new-book-window__btn-container__add-new-book-btn');
const logoBookshelfBtn = document.querySelector('.header__side__bookshelf-btn');
const showAllBtn = document.querySelector('.header__show-all-btn');

//FILTERS
const finishedBooksBtn = document.querySelector('.header__side__finished');
const readingBooksBtn = document.querySelector('.header__side__in-process');
const stoppedBooksBtn = document.querySelector('.header__side__stopped');
const laterBooksBtn = document.querySelector('.header__side__later');

//NEW BOOK WINDOW
const newBookWindow = document.querySelector('.new-book-window');
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
const emptyPageImg = document.querySelector('.empty-page-container__empty-page-image');
const noBooksFoundContainer = document.querySelector('.no-books-found-container');
const booksContainer = document.querySelector('.book-container');
const booksContainerColumn1 = document.querySelector('.book-container__column1');
const booksContainerColumn2 = document.querySelector('.book-container__column2');
const booksContainerColumn3 = document.querySelector('.book-container__column3');
const booksContainerColumn4 = document.querySelector('.book-container__column4');
const booksContainerColumn5 = document.querySelector('.book-container__column5');
const booksContainerColumn6 = document.querySelector('.book-container__column6');

//EVENTS
// window.addEventListener('mousemove', e => {
// 	e.preventDefault();
// 	console.log(e.offsetTop);
// });

newBookBtn.addEventListener('click', openNewBookWindow);
cancelBtn.addEventListener('click', closeNewBookWindow);
logoBookshelfBtn.addEventListener('click', scrollToTop);
searchbar.addEventListener('keyup', keyWordSearch);
searchbar.addEventListener('search', keyWordSearch);

newBookWindow.addEventListener('submit', e => {
	e.preventDefault();
});

finishedBooksBtn.addEventListener('click', e => {
	const finishedBooks = booksInStorage.filter(book => book.status === 'finished');
	let status = 'finished';
	filterBooks(finishedBooks, status, e);
});

readingBooksBtn.addEventListener('click', e => {
	const readingBooks = booksInStorage.filter(book => book.status === 'reading');
	let status = 'reading';
	filterBooks(readingBooks, status, e);
});

stoppedBooksBtn.addEventListener('click', e => {
	const stoppedBooks = booksInStorage.filter(book => book.status === 'stopped');
	let status = 'stopped';
	filterBooks(stoppedBooks, status, e);
});

laterBooksBtn.addEventListener('click', e => {
	const laterBooks = booksInStorage.filter(book => book.status === 'later');
	let status = 'later';
	filterBooks(laterBooks, status, e);
});

//EVENT FUNCTIONS
function openNewBookWindow() {
	addNewBookBtn.addEventListener('click', e => {
		addBookToLibrary(e);
	});
	newBookWindow.addEventListener('submit', e => {
		addBookToLibrary(e);
	});
	cleanInputFields();
	if (!errorMessage.classList.contains('hidden')) {
		errorMessage.classList.add('hidden');
	}
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

function deleteBook(divBookPlate, btnDelete, e) {
	if (divBookPlate.classList.contains(`id${btnDelete.id}`)) {
		divBookPlate.classList.add('animation-deleted');
	}
	setTimeout(() => {
		const filteredBooks = booksInStorage.filter(book => book.id !== btnDelete.id);
		booksInStorage = filteredBooks;
		localStorage.setItem('booksInStorage', JSON.stringify(booksInStorage));
		if (searchbar.value !== '') {
			keyWordSearch(e);
		} else {
			populateList(true);
		}
		console.log(booksContainerColumn1.lastChild);
		if (!booksContainerColumn1.lastChild) {
			emptyPageImg.classList.remove('display-none');
		}
	}, 400);
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
	addNewBookBtn.addEventListener('click', e => {
		saveChanges(btnEditId, e);
	});
}

function saveChanges(btnEditId, e) {
	if (addNewBookBtn.textContent !== 'Save Changes') {
		return;
	}
	if (!authorInput.value || !titleInput.value) {
		errorMessage.classList.remove('hidden');
		errorMessage.classList.add('animation-error');
		errorMessage.classList.remove('animation-error');

		return;
	}
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
	if (searchbar.value !== '') {
		keyWordSearch(e);
	} else {
		populateList(true);
	}
	closeNewBookWindow();
	let newAddNewBookBtn = addNewBookBtn.cloneNode(true);
	addNewBookBtn.parentNode.replaceChild(newAddNewBookBtn, addNewBookBtn);
	addNewBookBtn = newAddNewBookBtn;
}

function keyWordSearch(e) {
	e.preventDefault();
	emptyPageImg.classList.add('display-none');
	cleanColumns();
	if (searchbar.value === '') {
		populateList(true);
		showAllBtn.classList.add('hidden');
		return;
	}
	showShowAllBtn();
	const searchInput = searchbar.value.toLowerCase();
	const searchedBooks = booksInStorage.filter(
		book =>
			book.author.toLowerCase().includes(searchInput) ||
			book.title.toLowerCase().includes(searchInput) ||
			book.status.toLowerCase().includes(searchInput) ||
			book.rating.toLowerCase().includes(searchInput) ||
			book.page.toLowerCase().includes(searchInput) ||
			book.year.toLowerCase().includes(searchInput) ||
			book.genre.toLowerCase().includes(searchInput) ||
			book.note.toLowerCase().includes(searchInput)
	);

	checkIfFittingBooks(searchedBooks);
}

function filterBooks(filter, status, e) {
	e.preventDefault();
	emptyPageImg.classList.add('display-none');
	cleanColumns();
	showShowAllBtn();

	if (searchbar.value !== '') {
		const searchInput = searchbar.value.toLowerCase();
		const fittingBooks = booksInStorage.filter(
			book =>
				(book.author.toLowerCase().includes(searchInput) ||
					book.title.toLowerCase().includes(searchInput) ||
					book.rating.toLowerCase().includes(searchInput) ||
					book.page.toLowerCase().includes(searchInput) ||
					book.year.toLowerCase().includes(searchInput) ||
					book.genre.toLowerCase().includes(searchInput) ||
					book.note.toLowerCase().includes(searchInput)) &&
				book.status === status
		);
		checkIfFittingBooks(fittingBooks);
	} else {
		checkIfFittingBooks(filter);
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

function populateList(isPageLoad = false) {
	if (noBooksFoundContainer.lastChild) {
		noBooksFoundContainer.removeChild(noBooksFoundContainer.lastChild);
	}
	cleanColumns();
	if (booksInStorage.length === 0) {
		emptyPageImg.classList.remove('display-none');
		return;
	} else {
		emptyPageImg.classList.add('display-none');
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

	populateFirstRow(divBookPlate);

	if (!isPageLoad && newBook === booksInStorage[0]) {
		divBookPlate.classList.add('animation');
		setTimeout(() => {
			divBookPlate.classList.remove('animation');
		}, 2500);
	}

	btnDelete.addEventListener('click', e => {
		deleteBook(divBookPlate, btnDelete, e);
	});

	btnEdit.addEventListener('click', e => {
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

function populateFirstRow(divBookPlate) {
	if (!booksContainerColumn1.firstChild) {
		booksContainerColumn1.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn1);
		return;
	} else if (!booksContainerColumn2.firstChild) {
		booksContainerColumn2.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn2);
		return;
	} else if (!booksContainerColumn3.firstChild) {
		booksContainerColumn3.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn3);
		return;
	} else if (!booksContainerColumn4.firstChild) {
		booksContainerColumn4.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn4);
		return;
	} else if (!booksContainerColumn5.firstChild) {
		booksContainerColumn5.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn5);
		return;
	} else if (!booksContainerColumn6.firstChild) {
		booksContainerColumn6.appendChild(divBookPlate);
		createBufferDiv(booksContainerColumn6);
		return;
	} else if (
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn1.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn1.appendChild(divBookPlate, booksContainerColumn1.firstChild);
		createBufferDiv(booksContainerColumn1);
	} else if (
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn2.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn2.appendChild(divBookPlate, booksContainerColumn2.firstChild);
		createBufferDiv(booksContainerColumn2);
	} else if (
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn3.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn3.appendChild(divBookPlate, booksContainerColumn3.firstChild);
		createBufferDiv(booksContainerColumn3);
	} else if (
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop &&
		booksContainerColumn4.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn4.appendChild(divBookPlate, booksContainerColumn4.firstChild);
		createBufferDiv(booksContainerColumn4);
	} else if (
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn5.lastChild.offsetTop <= booksContainerColumn6.lastChild.offsetTop
	) {
		booksContainerColumn5.appendChild(divBookPlate, booksContainerColumn5.firstChild);
		createBufferDiv(booksContainerColumn5);
	} else if (
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn1.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn2.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn3.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn4.lastChild.offsetTop &&
		booksContainerColumn6.lastChild.offsetTop <= booksContainerColumn5.lastChild.offsetTop
	) {
		booksContainerColumn6.appendChild(divBookPlate, booksContainerColumn6.firstChild);
		createBufferDiv(booksContainerColumn6);
	}
}

function createBufferDiv(column) {
	const bufferDiv = document.createElement('div');
	column.appendChild(bufferDiv);
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

function showShowAllBtn() {
	showAllBtn.classList.remove('hidden');
	showAllBtn.addEventListener('click', () => {
		searchbar.value = '';
		populateList(true);
		showAllBtn.classList.add('hidden');
		if (noBooksFoundContainer.lastChild) {
			noBooksFoundContainer.removeChild(noBooksFoundContainer.lastChild);
		}
		if (!booksContainerColumn1.lastChild) {
			emptyPageImg.classList.remove('display-none');
		}
	});
}

function checkIfFittingBooks(list) {
	if (list.length === 0) {
		if (noBooksFoundContainer.lastChild) {
			return;
		}
		const noBooksFound = document.createElement('p');
		noBooksFound.textContent = 'No books found';
		noBooksFound.classList.add('no-books-found');
		noBooksFoundContainer.appendChild(noBooksFound);
	} else {
		list.map(newBook => createBooksDOM(newBook, true));
	}
}

populateList(true);
