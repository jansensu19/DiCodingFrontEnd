document.addEventListener("DOMContentLoaded", function () {
 
 
    const submitForm = document.getElementById("inputBook");
  
  
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addbooks();
    });
  
  
    if(isStorageExist()){
        loadDataFromStorage();
    }
 });

const booksearch = document.getElementById("searchBook")
booksearch.addEventListener("submit", function (event) {
    event.preventDefault()
    search()
})
  
 document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
 });