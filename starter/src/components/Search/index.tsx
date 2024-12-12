import React from "react";
import Book from "../Book";
import "../../App.css";
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
      setState({ query: newQuery, searchResults: [] });
      if (newQuery.length > 1) {
        //Returned a 403 error on searching a query with a single character
        searchBooks(newQuery.trim());
      }
    }
  };

  const onUpdateShelf = (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newShelf = event.target.value;
    BooksAPI.update(book, newShelf).then(() => {
      setState({
        ...state,
        searchResults: state.searchResults.map((b) =>
          b.id === book.id ? { ...b, shelf: newShelf } : b
        ),
      });
    });
  };

  const searchBooks = (query: string) => {
    BooksAPI.search(query, 20).then(
      (searchResults: BookDetails[] | undefined) => {
        if (searchResults) {
          searchResults.forEach((b) => {
            const matchedBook = searchResults.find((book) => book.id === b.id);
            if (matchedBook) {
              b.shelf = matchedBook.shelf;
            }
          });
          searchResults.sort((a, b) => a.title.localeCompare(b.title));
          setState({ ...state, searchResults });
        }
      }
    );
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
