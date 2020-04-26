import { Component, OnInit } from '@angular/core';
import {BookText} from "../model/book-text";
import {BookService} from "../service/book.service";

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {

  public book: BookText;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.book = this.bookService.getBookText(1);
  }

}
