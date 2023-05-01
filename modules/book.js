export default class Book {
  constructor() {
    this.bookLists = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBooktoList = (author, title) => {
    const updateBook = [
      ...this.bookLists,
      { id: `${Math.trunc(Math.random() * 100000)}${author.split(' ')[0]}`, author, title },
    ];
    this.updateStorage(updateBook);
  }

  removeBookfromList = (id) => {
    const updateBook = this.bookLists.filter((it) => it.id !== id);
    this.updateStorage(updateBook);
  }

  getBook = () => this.bookLists

  updateStorage = (data) => {
    localStorage.setItem('books', JSON.stringify(data));
    this.bookLists = data;
  }
}