async function loadBooks() {
    const res = await fetch("http://localhost:3000/api/books");
    const books = await res.json();
    const list = document.getElementById("book-list");
    list.innerHTML = "";
    books.forEach(book => {
      const item = document.createElement("li");
      item.textContent = `${book.title} by ${book.author}`;
      list.appendChild(item);
    });
  }
  
  async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author })
    });
    loadBooks();
  }
  
  loadBooks();
  
