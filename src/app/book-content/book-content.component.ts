import { Component, OnInit } from '@angular/core';
import {BookText} from "../model/book-text";
import {BookService} from "../service/book.service";
import {GraphqlService} from "../graphql.service";
import {Knowledge} from "../api-types";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  public book: Knowledge;

  constructor(private api: GraphqlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = Number.parseInt(this.route.snapshot.paramMap.get('id'))
    this.api.getBook(id).subscribe(r => this.book = r)
  }
}
