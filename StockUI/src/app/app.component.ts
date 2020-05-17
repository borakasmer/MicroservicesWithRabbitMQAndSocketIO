import { Component, AfterViewInit } from '@angular/core';
import { StockService } from 'src/Service/StockService';
import { Stock } from 'src/Model/stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'StockBanner';
  stockList: Stock[] = [];

  constructor(public service: StockService) { }

  ngAfterViewInit() {
    this.getStock();
    this.service.updatedStock.subscribe((stock: Stock) => {
      //debugger;
      stock.image = stock.change > 0 ? "green" : "red";
      let updateIndex = this.stockList.findIndex(stok => stok.name === stock.name)
      this.stockList[updateIndex] = stock;
    });
  }

  public getStock() {
    return this.service.getStocks()
      .subscribe((data: any = []) => {
        this.stockList = data;
        this.stockList.forEach(item => {
          item.image = item.change > 0 ? "green" : "red";
        })
        console.log(this.stockList);
      });
  }
}
