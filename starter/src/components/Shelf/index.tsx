import React from "react";
import Book from "../Book";
import { Box, Divider, Grid } from "@mui/material";
import { BookDetails } from "../../interfaces/BookInterfaces";

interface ShelfProps {
  books: BookDetails[];
  title: string;
  onUpdateShelf: (
    book: BookDetails,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Shelf = ({ books, title, onUpdateShelf }: ShelfProps) => {
  return (
    <div className="bookshelf">
      <Box component="h2">
        {title}
        <Divider orientation="horizontal" aria-hidden="true" />
      </Box>
      <Box className="bookshelf-books">
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={8} md={4} lg={2} key={book.id}>
              <Book book={book} onUpdateShelf={onUpdateShelf} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Shelf;
