import React from "react";
import Book from "../Book";
import * as BooksAPI from "../../BooksAPI";
import { BookDetails } from "../../interfaces/BookInterfaces";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

interface SearchProps {
  searchResults: BookDetails[];
  query: string;
  onUpdateShelf: (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Search = ({ query, onUpdateShelf }: SearchProps) => {
  const [state, setState] = React.useState<{
    query: string;
    searchResults: BookDetails[];
  }>({ query: "", searchResults: [] });

const updateQuery = (newQuery: string) => {
    //Added a check to see if the query is empty and reset the search results
    if (newQuery.trim().length === 0) {
      setState((prevState) => ({
        ...prevState,
        query: newQuery,
        searchResults: [],
      }));
    } else if (newQuery !== query) {
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

  const searchBooks = async (query: string): Promise<void> => {
    return BooksAPI.search(query, 100)
      .then(async (searchResults: BookDetails[] | undefined) => {
        if (searchResults) {
          const updatedResults = searchResults.map((b) => {
            return BooksAPI.get(b.id).then((bookDetails) => {
              if (bookDetails) {
                b.shelf = bookDetails.shelf;
              }
              return b;
            });
          });
          const results = await Promise.all(updatedResults);
          results.sort((a, b) => a.title.localeCompare(b.title));
          setState((prevState) => ({ ...prevState, searchResults: results }));
        }
      })
      .catch((error) => {
        console.error("Error searching books:", error);
      });
  };

  const onSearchUpdateShelf = (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const updatedBooks = state.searchResults.map((b) => {
      if (b.id === book.id) {
        b.shelf = event.target.value;
      }
      return b;
    });
    setState((prevState) => ({ ...prevState, searchResults: updatedBooks }));
    onUpdateShelf(book, event);
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
                <Book book={book} onUpdateShelf={onSearchUpdateShelf} />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Search;
