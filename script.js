var titleEl = document.querySelector("#title");
var titleSearchEl = document.querySelector("#titleSearch");
var yearSearchEl = document.querySelector("#authorSearch");
var yearEl = document.querySelector("#author-bio");
var resutlsEl = document.querySelector("#results");
var searchBtnEl = document.querySelector("#searchBtn-1");
var searchBtnE2 = document.querySelector("#searchBtn-2");

// basic click event for the genre search

function titleSearch() {
  searchBtnEl.addEventListener("click", function () {
    const bookGenre = titleSearchEl.value;

    if (bookGenre !== "") {
      console.log(bookGenre);
    } else {
      return;
    }
  });
}

titleSearch();

// basic click event for the year search

function authorBio() {
  searchBtnE2.addEventListener("click", function () {
    const authBio = yearSearchEl.value;

    if (authBio !== "") {
      console.log(authBio);
    } else {
      return;
    }
  });
}

function description(data) {
  const descriptionEl = document.querySelector("#rsltcont");

  if (data.items) {
    const des = data.items[0].searchInfo.textSnippet;
    descriptionEl.textContent = "Book Description: " + des;
  } else {
    descriptionEl.textContent = "Description Not Found";
  }
}

function authors(data) {
  // data.items[0].volumeInfo.authors[0]
  const authorsEl = document.querySelector("#authors");

  if (data.items[0].volumeInfo.authors) {
    const authors = data.items[0].volumeInfo.authors[0];
    authorsEl.textContent = "Author(s): " + authors;
  } else {
    authorsEl.textContent = "Authors Not Found";
  }
}

function previewLink(data) {
  const bookLink = document.querySelector("#book-info");
  bookLink.innerHTML = "";
  if (data.items) {
    const preview = data.items[0].volumeInfo.previewLink;
    const link = document.createElement('a');
    link.href = preview;
    link.textContent = "View Preview";
    bookLink.appendChild(link)
  } else {
    bookLink.textContent = "Description Not Found";
  }
}

function getData(title) {
  var apiUrl = "https://openlibrary.org/search.json?q=" + title + "&limit=1";
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('Title', title);
      start(data.docs[0].title);
    });
}


function start(title) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);
    authors(data);
    description(data);
    previewLink(data);
  })
  .catch(function (error) {
    console.log("Error: " + error.message);
  });
}

searchBtnEl.addEventListener("click", function () {
  var title = titleSearchEl.value;
  getData(title);
});