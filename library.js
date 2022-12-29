let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return (
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "has read" : "not read yet"
      }`
    );
  };
}

function addBooktoLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const display = document.querySelector('.display');

// Set buttons to be listening
const setBtnsListen = () => {
  const removeBookBtns = document.querySelectorAll('.remove-book-btn');
  removeBookBtns.forEach(btn => btn.addEventListener('click', deleteBook));

  const changeReadBtns = document.querySelectorAll('.change-read-btn');
  changeReadBtns.forEach(btn => btn.addEventListener('click', toggleReadStatus));
}

const loopArrDisplayBook = () => {
  // remove existing display
  var displayedBooks = display.getElementsByClassName('book-card');
  while (displayedBooks[0]) {
    displayedBooks[0].parentNode.removeChild(displayedBooks[0]);
  }

  // display the new books
  let idx = 0;
  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookCard.appendChild(bookAuthor);

    const bookNumPages = document.createElement('p');
    bookNumPages.textContent = book.pages;
    bookCard.appendChild(bookNumPages);

    const hasRead = document.createElement('p');
    hasRead.textContent = book.read ? "Has read" : "Not fully read";
    bookCard.appendChild(hasRead);

    const changeReadBtn = document.createElement('button');
    changeReadBtn.classList.add('change-read-btn');
    changeReadBtn.innerText = 'Change read status 🎛️';
    changeReadBtn.setAttribute('idx', idx);
    bookCard.appendChild(changeReadBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-book-btn');
    deleteBtn.innerText = 'Delete book ❌';
    deleteBtn.setAttribute('idx', idx);
    bookCard.appendChild(deleteBtn);

    display.appendChild(bookCard);

    idx += 1;
  })

  setBtnsListen();
}

// Hardcoded to test validity of loopArrDisplayBook
addBooktoLibrary("Lord of the Rings", "J.R.R Tolkkien", "340", true);
addBooktoLibrary("Attack on Titan", 'Hajime Isayama', '162', false);
loopArrDisplayBook();

// Show/hide pop-up form to add book
const addBookFormContainer = document.getElementById('addBookForm');
function openForm() {
  addBookForm.style.display = 'block';
}

function closeForm() {
  addBookForm.style.display = 'none';
}

// Grab submitted form info in JS
addBookForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const inputTitle = event.currentTarget.childNodes[1].title.value;
  const inputAuthor = event.currentTarget.childNodes[1].author.value;
  const inputNumPages = event.currentTarget.childNodes[1].numPages.value;
  const inputHasRead = event.currentTarget.childNodes[1].hasRead.checked;

  addBooktoLibrary(inputTitle, inputAuthor, inputNumPages, inputHasRead);
  loopArrDisplayBook();

  addBookForm.children[0].reset();
})

// Delete selected book
function deleteBook() {
  const idxToBeDeleted = this.attributes.idx.value;
  myLibrary.splice(idxToBeDeleted, 1);

  loopArrDisplayBook();
}

// Change read status
function toggleReadStatus() {
  const idxToBeToggled = this.attributes.idx.value;
  myLibrary[idxToBeToggled].read = !myLibrary[idxToBeToggled].read;
  loopArrDisplayBook();
}