import {Component, OnInit} from '@angular/core';
import {Product} from "../api-types";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {GraphqlService} from "../graphql.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manufacture-report',
  templateUrl: './manufacture-report.component.html',
  styleUrls: ['./manufacture-report.component.scss']
})
export class ManufactureReportComponent implements OnInit {

  products: Product[] = []
  lastComplete: Product[] = []
  currentProduct: Product;
  countForm: FormGroup;

  public amountValues = [1, 2, 3, 4, 5];
  public manufacturedItemList: Array<Product> = [];

  isValidProductChosen: Boolean = true;

  constructor(private apiService: GraphqlService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.manufacturedItemList.push({} as Product);
    this.apiService.searchProducts().subscribe((data) => this.products = data);
    this.countForm = this.fb.group({
      countControl: [ 1 ]
    });
    this.countForm.valueChanges.subscribe(x => console.log(x));
  }

  search = (text: Observable<string>) =>
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        let result =
          term.length < 2 ? []:
            this.products
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)

        this.lastComplete = result
        return result.map(v => v.name)
      })
    );

  public add(): void {
    const amount = this.countForm.controls.countControl.value;
    if (typeof this.currentProduct?.id !== 'undefined') {
      this.currentProduct.count = amount;
      this.manufacturedItemList.pop();
      this.manufacturedItemList.push(this.currentProduct, {} as Product);
      this.isValidProductChosen = true;
      this.currentProduct = {} as Product;
    } else {
      this.isValidProductChosen = false;
    }
  }

  public remove(idx: number): void {
    this.manufacturedItemList.splice(idx, 1);
  }

  public navigate(id: number): void {
    this.router.navigate(['products', id]);
  }

  handleValueChange(event: any, id: number) {
    const amount = Number.parseInt(event);
    const existingProduct = this.manufacturedItemList.filter(pr => pr.id === id)[0];
    if (existingProduct) {
      existingProduct.count = amount;
    } else if (typeof this.currentProduct?.id !== 'undefined') {
      this.currentProduct.count = amount;
    }
  }

  sendRequest() {
    // TODO
    console.log(this.manufacturedItemList)
  }

  validateInput(s: String) {
    let l = this.lastComplete.filter(v => v.name == s)
    if (l.length != 1) {
      this.isValidProductChosen = false;
    } else {
      this.currentProduct = l[0];
      this.isValidProductChosen = true;
    }
  }
}
