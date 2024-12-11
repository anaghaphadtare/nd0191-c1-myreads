import { BookDetails } from "./interfaces/BookInterfaces";

const api: string = "https://reactnd-books-api.udacity.com";

let token: string | null = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers: HeadersInit = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId: string): Promise<BookDetails> =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = (): Promise<BookDetails[]> =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books);

export const update = (
  book: { id: string },
  shelf: string
): Promise<BookDetails> =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (
  query: string,
  maxResults: number
): Promise<BookDetails[]> =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
