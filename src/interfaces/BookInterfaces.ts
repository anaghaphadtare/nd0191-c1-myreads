export interface BookDetails {
  id: string;
    title: string;
    author: string[];
    shelf: string;
    imageLinks: {
      thumbnail: string;
    };
}
