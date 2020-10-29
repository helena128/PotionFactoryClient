import {Component, OnInit} from '@angular/core';
import {GraphqlService} from "../graphql.service";
import {UserRole} from "../api-types";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  transferList: any[];

  constructor(private graphqlService: GraphqlService, private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.graphqlService.getTransferReportList().subscribe(data => this.transferList = data);
  }

  isWarehouseManager(): boolean {
    return localStorage.getItem('userRole') === UserRole.WorkshopManager;
  }

  transfer(item: any) {
    this.graphqlService.transferProducts(item?.id).subscribe(data => {
      if (data) {
        this.toasterService.success('Successfully started transportation!');
        item.status = 'Transfer';
      } else {
        this.toasterService.error('Couldn\'t start transportation!');
      }
    });
  }

  getProducts(products: any[]): string {
    if (!products || products?.length === 0) {
      return '';
    }
    const uniqueProductNames = products.map(product => product.name).filter((item, i, ar) => ar.indexOf(item) === i);
    return uniqueProductNames.slice(0, 2).join(', ');
  }

  getProductsAndCount(products: any) {
    const result = products.map(item => item.name).reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
    const resultedList = [];
    for (let key in result) {
      resultedList.push({name: key, val: result[key]});
    }
    return resultedList;
  }

  acknowledgeArrived(item: any) {
    this.graphqlService.receiveProducts(item?.id).subscribe(data => {
      if (data) {
        this.toasterService.success('Successfully updated status');
        item.status = 'Stored';
      } else {
        this.toasterService.error('Error happened');
      }
    });
  }
}
