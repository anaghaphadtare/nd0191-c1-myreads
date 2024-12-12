import React from "react";
import Book from "../Book";
import * as BooksAPI from "../../BooksAPI";
import { BookDetails } from "../../interfaces/BookInterfaces";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

interface SearchProps {
  searchResults: BookDetails[];
  query: string;
}

const Search = ({ query }: SearchProps) => {
  const [state, setState] = React.useState<{
    query: string;
    searchResults: BookDetails[];
  }>({ query: "", searchResults: [] });

  const updateQuery = (newQuery: string) => {
    if (newQuery !== query) {
      setState((prevState) => ({ ...prevState, query: newQuery }));
      if (newQuery.length > 1) {
        //Returned a 403 error on searching a query with a single character
        searchBooks(newQuery.trim()).catch((error: Error) => {
          console.error("Error searching books:", error);
          // Optionally, you can set an error state to display a message to the user
        });
      }
    }
  };

  const onUpdateShelf = (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newShelf = event.target.value;
    BooksAPI.update(book, newShelf).then(() => {
      setState((prevState) => ({
        ...prevState,
        searchResults: prevState.searchResults.map((b) =>
          b.id === book.id ? { ...b, shelf: newShelf } : b
        ),
      }));
    });
  };

  const searchBooks = (query: string): Promise<void> => {
    return BooksAPI.search(query, 20)
      .then((searchResults: BookDetails[] | undefined) => {
        if (searchResults) {
          searchResults.forEach((b) => {
            const matchedBook = searchResults.find((book) => book.id === b.id);
            if (matchedBook) {
              b.shelf = matchedBook.shelf;
            }
          });
          searchResults.sort((a, b) => a.title.localeCompare(b.title));
          setState((prevState) => ({ ...prevState, searchResults }));
        }
      })
      .catch((error) => {
        console.error("Error searching books:", error);
        // Optionally, you can set an error state to display a message to the user
      });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={`/`}>
          Close
        </Link>

        <TextField
          variant="outlined"
          placeholder="Search by title or author"
          value={state.query}
          onChange={(event) => updateQuery(event.target.value)}
          fullWidth
        />
      </div>
      <div className="search-books-results">
        <Grid container spacing={3}>
          {state.searchResults.length > 0 &&
            state.searchResults.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <Book onUpdateShelf={onUpdateShelf} book={book} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Search;
