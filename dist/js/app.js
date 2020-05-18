// Book Class
class Book {
  constructor(bid, title, author, category) {
    this.bid = bid;
    this.title = title;
    this.author = author;
    this.category = category;
  }
}

// UI Class: Handle UI Task
class UI {
  static displayBooks() {
    const books = Store.getBook();

    // Loop thorugh each book and add to the list
    books.forEach((book, index) => UI.addBookToList(book, index));
  }

  static addBookToList(book, id) {
    const list = document.querySelector(".book-list");

    // Creating a rom
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${id + 1}</td>        
        <td>${book.title}</td>        
        <td>${book.author}</td>        
        <td>${book.bid}</td>        
        <td>${book.category}</td>
        <td><a href="#" class="btn delete"><i class="fas fa-trash"></i></a></td>     
    `;

    // Appending in a book list
    list.appendChild(row);
  }

  //   Show Alerts
  static showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    // Vanished after 3 sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
      location.reload();
    }, 1000);
  }

  //   Clear Fields
  static clearFields() {
    document.querySelector("#bookid").value = "";
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#inputState").value = "Select Category";
  }

  // Delete Book
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store Class :Handle Storage
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") == null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBooks(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBoook(bookid) {
    const books = Store.getBook();
    books.forEach((book, index) => {
      if (book.bid === bookid) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Events to display book
document.addEventListener("DOMContentLoaded", UI.displayBooks());

// Event to add a book
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get form values
  const bookid = document.querySelector("#bookid").value;
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const category = document.querySelector("#inputState").value;

  //   Validation
  if (bookid === "" || title === "" || author === "" || category === "") {
    UI.showAlert("Please fill all the fields !", "danger");
  } else {
    //Instantiate Book Class
    const book = new Book(bookid, title, author, category);

    //Add book to UI
    UI.addBookToList(book);

    // Add book to localStorage
    Store.addBooks(book);

    // Show sucess
    UI.showAlert("Book Added Sucessfully !", "success");

    //  Clear Fields
    UI.clearFields();
  }
});

// Event to remove a book
document.querySelector(".book-list").addEventListener("click", (e) => {
  // Remove Book from UI
  UI.deleteBook(e.target.parentElement);

  //   Remove book from localStorage
  Store.removeBoook(
    e.target.parentElement.parentElement.previousElementSibling
      .previousElementSibling.textContent
  );

  // Show sucess
  UI.showAlert("Book Removed Sucessfully !", "success");
});
