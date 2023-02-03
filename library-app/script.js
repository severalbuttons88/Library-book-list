const gridBox = document.querySelector(".cardGrid");
const bookButton = document.querySelector("#add-book");
const formPopup = document.querySelector("#pop-wrapper");
const form = document.querySelector("#book-form");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

let submitCounter = -1;
let titleValue = "";
let authorValue = "";
let pagesValue = "";
let readValue = "";

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let getInput = prompt("Enter name of book: ");
  myLibrary.push(getInput);
}

function displayBookOnPage(bookList) {
  bookList.map((book, indexOfArray) => {
    if (indexOfArray === submitCounter) {
      let div = document.createElement("div");
      div.id = `${indexOfArray}`;
      div.classList.add("card");
      let delButton = document.createElement("button");
      delButton.classList.add("delete-button");
      let titlePara = document.createElement("p");
      titlePara.classList.add("card-title");
      let authorPara = document.createElement("p");
      let pagesPara = document.createElement("p");
      let readPara = document.createElement("p");
      readPara.classList.add("read-adjust");
      delButton.textContent = "Delete This Book";
      delButton.id = `delete-${indexOfArray}`;
      deleteButton(delButton);

      titlePara.textContent = `${book.title}`;
      authorPara.textContent = `Written by ${book.author}`;
      pagesPara.textContent = `Contains ${book.pages} pages`;
      if (book.read === "yes") {
        readPara.textContent = `You Have Read This Book!`;
      } else if (book.read === "no") {
        readPara.textContent = `You Have Not Read This Book`;
      }
      div.append(titlePara);
      div.append(authorPara);
      div.append(pagesPara);
      div.append(readPara);
      div.append(delButton);

      gridBox.append(div);
    }
  });
}

function showPopUp() {
  bookButton.addEventListener("click", () => {
    if (formPopup.classList.contains("form-popup")) {
      formPopup.classList.remove("form-popup");
      formPopup.classList.add("form-default");
    } else if (formPopup.classList.contains("form-default")) {
      formPopup.classList.remove("form-default");
      formPopup.classList.add("form-popup");
    }
  });
}
function deleteButton(button) {
  button.addEventListener("click", () => {
    let buttonIdString = button.id;
    buttonIdString = removeCharacters(buttonIdString);
    let buttonIndexPos = Number(buttonIdString);
    const divToDelete = document.getElementById(`${buttonIndexPos}`);
    divToDelete.remove();
  });
}
function removeCharacters(str) {
  let removed = str.replace(/\D/g,"");
  return removed;
}
function formSubmit() {
  addEventListener("submit", (e) => {
    e.preventDefault();
    submitCounter += 1;
    titleValue = title.value;
    authorValue = author.value;
    pagesValue = pages.value;
    readValue = read.value;
    myLibrary[submitCounter] = new Book(
      titleValue,
      authorValue,
      pagesValue,
      readValue
    );
    displayBookOnPage(myLibrary);
    form.reset();
    formPopup.classList.remove("form-popup");
    formPopup.classList.add("form-default");
  });
}
showPopUp();
formSubmit();
