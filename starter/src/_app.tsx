import React, { useState } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import { BookDetails } from "./interfaces/BookInterfaces";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";

const App = () => {
  const [books, setBooks] = React.useState<BookDetails[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await BooksAPI.getAll();
        console.log("response:", response);
        setBooks(response);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, []);

  const updateShelf = (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newShelf = event.target.value;
    console.log(book.id, newShelf);
    BooksAPI.update(book, newShelf).then(() => {
      setBooks((prevBooks) =>
        prevBooks
          ? prevBooks.map((b) =>
              b.id === book.id
                ? {
                    ...b,
                    shelf: newShelf,
                    authors: book.authors,
                    title: book.title,
                    imageLinks: book.imageLinks,
                  }
                : b
            )
          : prevBooks
      );
    });
  };

  const [searchResults] = useState<BookDetails[]>([]);
  const [query] = useState<string>("");

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<ListBooks books={books} onUpdateShelf={updateShelf} />}
        />
        <Route
          path="/search"
          element={
            <Search
              searchResults={searchResults}
              query={query}
              onUpdateShelf={updateShelf}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
