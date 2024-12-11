import React from "react";
import Shelf from "../Shelf";
import { Link } from "react-router-dom";
import { BookDetails } from "../../interfaces/BookInterfaces";

interface ListBooksProps {
  books: BookDetails[] | undefined;
  onUpdateShelf: (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const ListBooks = ({ books, onUpdateShelf }: ListBooksProps) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf
          title={"Currently Reading"}
          onUpdateShelf={onUpdateShelf}
          books={
            books?.filter((book) => {
              return book.shelf === "currentlyReading";
            }) || []
          }
        />
        <Shelf
          title={"Want To Read"}
          onUpdateShelf={onUpdateShelf}
          books={
            books?.filter((book) => {
              return book.shelf === "wantToRead";
            }) || []
          }
        />
        <Shelf
          title={"Read"}
          onUpdateShelf={onUpdateShelf}
          books={
            books?.filter((book) => {
              return book.shelf === "read";
            }) || []
          }
        />
      </div>
      <div className="open-search">
        <Link to={`/search`}>Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
