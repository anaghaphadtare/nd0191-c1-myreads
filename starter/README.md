# MyReads Project

This is the MyReads project, a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. This project is built using React and provides a simple and intuitive interface for managing your reading list.

## Features

- **Categorize Books**: Easily categorize books into "Currently Reading", "Want to Read", and "Read".
- **Search Books**: Search for books to add to your collection using a search API.
- **Update Book Status**: Move books between categories as you progress through your reading list.

## Components

### Book
Represents a single book in the app. Displays the book's title, author, and cover image. Allows users to change the book's category.

### BookShelf
Displays a collection of books categorized into "Currently Reading", "Want to Read", and "Read". Each category is represented by a separate `BookShelf` component.

### BookList
The main component that holds the `BookShelf` components. It fetches the books from the backend and distributes them to the appropriate `BookShelf`.

### SearchBooks
Allows users to search for new books to add to their collection. It uses a search API to fetch book results based on user input.

### App
The root component that sets up the routes for the application. It includes the `BookList` and `SearchBooks` components.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/anaghaphadtare/nd0191-c1-myreads.git
    ```
2. Navigate to the project directory:
    ```bash
    cd starter
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To start the development server, run:
```bash
npm run dev
```
This will launch the app in your default web browser. You can now start managing your reading list.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to Udacity for providing the starter code and inspiration for this project.
- Special thanks to the React community for their valuable resources and support.
