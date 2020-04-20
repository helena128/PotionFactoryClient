import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent implements OnInit {

  public books: Array<Book>;

  constructor() { }

  ngOnInit(): void {
    this.initBooks();
  }

  private initBooks(): void {
    this.books = new Array<Book>();
    this.books.push(
      {
        bookId: 1,
        bookName: "Book One",
        bookPreviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
          "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi " +
          "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
          "dolore eu fugiat nulla pariatur."
      } as Book,
      {
        bookId: 2,
        bookName: "Book Two",
        bookPreviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
          "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi " +
          "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
          "dolore eu fugiat nulla pariatur."
      } as Book,
      {
        bookId: 3,
        bookName: "Book Three",
        bookPreviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt " +
          "ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi " +
          "ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
          "dolore eu fugiat nulla pariatur."
      } as Book
    )
  }
}
