export interface BookDetails {
  id: string;
    title: string;
    authors: string[];
    shelf: string;
    imageLinks: {
      thumbnail: string;
    };
}
