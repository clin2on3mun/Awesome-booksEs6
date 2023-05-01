import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const addButton = document.querySelector('.add-book');
const bookList = document.getElementById('books-list');
const allBooks = document.getElementById('show-books');
const bookAdd = document.getElementById('add-book');
const contact = document.getElementById('contact');
const listLink = document.querySelector('.list-link');
const AddBookLink = document.querySelector('.form-link');
const contactLink = document.querySelector('.contact-link');

const books = new Book();
let bookListArray = books.getBook();

const displayBook = () => {
  bookList.innerHTML = '';
  bookListArray.forEach((book) => bookList.insertAdjacentHTML('beforeend',
    `<div class="book">
     <p class="paragraph">${book.title} by ${book.author}</p>
     <button class="remove remove-book" id=${book.id}>remove</button>
     </div>`));
};

const hideSections = () => {
  allBooks.classList.add('active');
  bookAdd.classList.add('active');
  contact.classList.add('active');
};
const removeActive = () => {
  AddBookLink.classList.remove('visible');
  listLink.classList.remove('visible');
  contactLink.classList.remove('visible');
};

AddBookLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  bookAdd.classList.remove('active');
  removeActive();
  AddBookLink.classList.add('visible');
});

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  removeActive();
  allBooks.classList.remove('active');
  listLink.classList.add('visible');
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  contact.classList.remove('active');
  removeActive();
  contactLink.classList.add('visible');
});
const initialize = () => {
  hideSections();
  allBooks.classList.remove('active');
  listLink.classList.add('visible');
  displayBook();
};
initialize();

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('book-name').value;
  const bookAuthor = document.getElementById('book-author').value;
  if (bookTitle.trim() === '' || bookAuthor.trim() === '') {
    return;
  }

  books.addBooktoList(bookAuthor, bookTitle);
  bookListArray = books.getBook();
  displayBook();

  document.getElementById('book-name').value = '';
  document.getElementById('book-author').value = '';
});

allBooks.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.remove');

  if (deleteButton) {
    books.removeBookfromList(deleteButton.id);
    bookListArray = books.getBook();
    deleteButton.parentElement.remove();
  }
});

const dateAndTime = document.querySelector('#date-and-time');
const date = new Date();
date.textContent = `${date.toDateString()}`;

setInterval(() => {
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  dateAndTime.textContent = `${date}`;
}, 1000);
