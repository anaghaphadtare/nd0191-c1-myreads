import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Grid/Grid";
import React from "react";
import type { BookDetails } from "../../interfaces/BookInterfaces";

interface BookProps {
  book: BookDetails;
  onUpdateShelf: (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Book = ({ book, onUpdateShelf }: BookProps) => {
  if (!book) return <div>No books found</div>;

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="book">
              <div className="book-top">
                <div
                  className={`book-cover ${
                    book?.shelf !== "none" ? book?.shelf : ""
                  }`}
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: book?.imageLinks
                      ? `url(${book?.imageLinks.thumbnail})`
                      : "No Books Found",
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select
                    value={book?.shelf || "none"}
                    onChange={(event) => onUpdateShelf(book, event)}
                  >
                    <option value="moveTo" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book?.title}</div>
              <div className="book-authors">{book?.author}</div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Book;
