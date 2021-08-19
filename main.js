const incompleted = "incompleteBookshelfList";
const completed = "completeBookshelfList";
const uncompleted = "books";
const BOOK_ITEMID = "itemId";

function makebooks(title, author, year, isCompleted){
    const titlebooks = document.createElement("h3");
    titlebooks.classList.add('input-title');
    titlebooks.innerText = title;

    const authorbooks = document.createElement("p");
    authorbooks.classList.add('input-author');
    authorbooks.innerText = author;

    const yearbooks = document.createElement("p");
    yearbooks.classList.add('input-year');
    yearbooks.innerText = year;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");


    const textContainer = document.createElement("article");
    textContainer.classList.add("inner")
    textContainer.append(titlebooks, authorbooks,yearbooks);
    
    if(isCompleted){
        buttonContainer.append(
            createNoButton(),
            createDeleteButton()
        );
        textContainer.append(buttonContainer);
    } else {
        buttonContainer.append(
            createYesButton(),
            createDeleteButton()
        );
        textContainer.append(buttonContainer);
    }
 
    return textContainer;
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createYesButton() {
    return createButton("yes-button", function(event){
        addbookstocompleted(event.target.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton("delete-button", function(event){
        removebookfromcompleted(event.target.parentElement.parentElement);
    });
}

function createNoButton() {
    return createButton("no-button", function(event){
        undobookstocompleted(event.target.parentElement.parentElement);
    });
}

function addbooks(){
    const incompleted_books = document.getElementById(incompleted);
    const completed_books = document.getElementById(completed);
    const titlebooks = document.getElementById("inputBookTitle").value;
    const authorbooks = document.getElementById("inputBookAuthor").value;
    const yearbooks = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const book = makebooks(titlebooks, authorbooks, yearbooks, isCompleted);

    const bookObject = composeBookObject(titlebooks, authorbooks, yearbooks, isCompleted);
   
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    if(isCompleted){
        completed_books.append(book);
        alert("Buku Telah Berhasil Di Masukkan : " + titlebooks);
    }
    else{
        incompleted_books.append(book);
        alert("Buku Telah Berhasil Di Masukkan : " + titlebooks);
    }
    updateDataToStorage();
}

function addbookstocompleted(taskElement) {
    const done = document.getElementById(completed);
    const titlebooks = taskElement.querySelector("#incompleteBookshelfList > .inner > h3").innerText;
    const authorbooks = taskElement.querySelector(".input-author").innerText;
    const yearbooks = taskElement.querySelector(".input-year").innerText;
    const newbook = makebooks(titlebooks, authorbooks, yearbooks, true);

    const book = findbook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newbook[BOOK_ITEMID] = book.id;

    done.insertBefore(newbook, done.firstElementChild);
    taskElement.remove();
    updateDataToStorage();
    
}

function removebookfromcompleted(taskElement) {
    document.getElementById('id_confrmdiv').style.display="block";
    
    document.getElementById('id_truebtn').onclick = function(){
        alert("Buku telah dihapus")
        taskElement.remove();
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);
        document.getElementById('id_confrmdiv').style.display = "none";
        taskElement.remove();
        updateDataToStorage();
        return true;
    };
    
    document.getElementById('id_falsebtn').onclick = function(){
        alert('Canceled!');
        document.getElementById('id_confrmdiv').style.display = "none";
        return false;
    };
}

function undobookstocompleted(taskElement){
    const incompleted_books = document.getElementById(incompleted);
    const titlebooks = taskElement.querySelector("#completeBookshelfList > .inner > h3").innerText;
    const authorbooks = taskElement.querySelector(".input-author").innerText;
    const yearbooks = taskElement.querySelector(".input-year").innerText;

    const newbook = makebooks(titlebooks, authorbooks, yearbooks, false);

    const book = findbook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newbook[BOOK_ITEMID] = book.id;

    incompleted_books.append(newbook);
    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromBooks() {
    const incompleted_books = document.getElementById(incompleted);
    const completed_books = document.getElementById(completed);

    for(book of books){
        const newbook = makebooks(book.titlebooks, book.authorbooks, book.yearbooks, book.isCompleted);
        newbook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            completed_books.append(newbook);
        } else {
            incompleted_books.append(newbook);
        }
    }
 }

 function search() {
    const textSearch = document.getElementById("searchBookTitle").value
 
    const incompleted_books = document.getElementById(incompleted);
    const completed_books = document.getElementById(completed);
 
    let takes = books.filter((book)  => {
        return book.titlebooks.toLowerCase().includes(textSearch.toLowerCase())
    })
    const isCompleted = document.getElementById(completed).childElementCount;
    const incompleted = document.getElementById(incompleted).childElementCount;
 
    let i = 0
    while (i < isCompleted) {
        completed_books.removeChild(completed_books.lastElementChild);
        i++;
    }
    i = 0;
    while (i < incompleted) {
        incompleted_books.removeChild(incompleted_books.lastElementChild);
        i++;
    }
    for (book of takes) {
        const newbook = makebooks(book.titlebooks, book.authorbooks, book.yearbooks, book.isCompleted);
        newbook[BOOK_ITEMID] = book.id;
        if (book.isCompleted) {
            completed_books.append(newbook);
            console.log("Selesai Dibaca : ", newbook)
        }
        if (book.isCompleted == false) {
            incompleted_books.append(newbook);
            console.log("Belum Selesai Dibaca : ", newbook);
        }
    }
}