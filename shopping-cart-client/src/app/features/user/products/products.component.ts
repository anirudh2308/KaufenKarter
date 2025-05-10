import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { SharedproductserviceService } from "../sharedproductservice.service";
import { Router } from "@angular/router";
import { AddcartserviceService } from "../specificproduct/addcartservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  minrange = 0;
  maxrange = 500000;

  loaded = false;

  selectedSubcat = "";

  productList: any;
  filteredList = [];

  categories = [];
  temp = []; //main categories to render from
  temp1 = []; //brands
  brandfilterboolean = [];

  sortSelection = "None";
  sortDirection = false;
  // 90 12 50 60 0 100

  sortswitch() {
    this.sortDirection = !this.sortDirection;
    if (this.sortDirection == false) this.sortInc();
    else this.sortDec();
  }

  sortInc() {
    this.filteredList.sort((a, b) =>
      +a["price"] < +b["price"] ? -1 : +a["price"] > +b["price"] ? 1 : 0
    );
  }

  sortDec() {
    this.filteredList.sort((a, b) =>
      +a["price"] > +b["price"] ? -1 : +a["price"] < +b["price"] ? 1 : 0
    );
  }

  changeSortSelection(value) {
    this.sortSelection = value;
    if (value == "price") this.sortInc();
  }

  constructor(
    private productService: ProductService,
    private prodService: SharedproductserviceService,
    private addService: AddcartserviceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  buyNow(id) {
    this.prodService.sendNumber(1);
    this.addService
      .pull(JSON.parse(localStorage.getItem("data"))["id"])
      .subscribe((data) => {
        let cart = data;
        // console.log(this.cart["order"]);
        // console.log(this.product["id"]);
        // console.log(this.count);
        cart["order"].push(id);
        cart["quant"].push(1);

        this.addService
          .push(JSON.parse(localStorage.getItem("data"))["id"], cart)
          .subscribe((data) => {});
      });

    this._snackBar.open("Nice choice!", "Redirecting to checkout!", {
      duration: 2000,
    });

    setTimeout(() => {
      this.router.navigate(["/user/userdash/checkout"]);
    }, 1000);
  }

  newMessage(product) {
    this.prodService.changeMessage(product);
    this.router.navigate(["/user/userdash/productinfo"]);
  }

  resetAll() {
    this.minrange = 0;
    this.maxrange = 500000;
    this.selectedSubcat = "";
    this.filteredList = this.productList;
    this.sortSelection = "";

    this.temp1 = [];
    this.brandfilterboolean = [];
  }

  filterProducts() {
    if (!(this.brandfilterboolean.length == 0)) {
      //if any checkbox is selected, else simply copy array.
      this.filteredList = [];

      let testallfalse = false; //if all checkboxes deselected, everything should be displayed.
      for (let i = 0; i < this.brandfilterboolean.length; i++) {
        if (this.brandfilterboolean[i] == true) {
          testallfalse = true;
          break;
        }
      }

      if (testallfalse == false) {
        for (let i = 0; i < this.temp1.length; i++)
          for (let item of this.productList)
            if (item["brand"] == this.temp1[i])
              this.filteredList[this.filteredList.length] = item;
      } else
        for (let i = 0; i < this.brandfilterboolean.length; i++) {
          if (this.brandfilterboolean[i] == true)
            for (let item of this.productList)
              if (item["brand"] == this.temp1[i])
                this.filteredList[this.filteredList.length] = item;
        }
    } else this.filteredList = this.productList;

    let pricefiltered = [];
    for (let i = 0; i < this.filteredList.length; i++) {
      if (
        +this.filteredList[i]["price"] >= this.minrange &&
        +this.filteredList[i]["price"] <= this.maxrange
      ) {
        pricefiltered[pricefiltered.length] = this.filteredList[i];
      }
    }
    this.filteredList = pricefiltered;
  }

  filterProductsBrandBased(index) {
    this.brandfilterboolean[index] = !this.brandfilterboolean[index];
    console.log(this.brandfilterboolean);
    this.filterProducts();
  }

  getBrands(subcat) {
    this.resetAll();
    this.selectedSubcat = subcat;
    this.temp1 = [];
    this.brandfilterboolean = [];
    this.minrange = 0;
    this.maxrange = 100000;
    for (let item of this.productList) {
      if (item["subcategory"] == subcat) this.temp1.push(item["brand"]);
    }

    for (let i = 0; i < this.temp1.length; i++)
      this.brandfilterboolean.push(false);

    this.filteredList = [];
    for (let i = 0; i < this.temp1.length; i++)
      for (let item of this.productList)
        if (item["brand"] == this.temp1[i])
          this.filteredList[this.filteredList.length] = item;
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + "k";
    }

    return value;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      setTimeout(() => {
        this.loaded = true;
      }, 1000);
      this.productList = data;

      let templist = [];
      for (let item of this.productList)
        if (item["active"] == "true") templist.push(item);

      this.productList = templist;
      this.filteredList = this.productList;
      for (let item of this.productList) {
        if (!this.categories.hasOwnProperty(item["category"])) {
          this.categories[item["category"]] = [];
          this.temp.push(item["category"]);
        }
        if (!this.categories[item["category"]].includes(item["subcategory"]))
          this.categories[item["category"]].push(item["subcategory"]);
      }

      this.prodService.searchCurrentMessage.subscribe((data) => {
        console.log(data);
        if (data != "") {
          this.filteredList = [];
          for (let item of this.productList) {
            if (
              item["name"].includes(data) ||
              item["brand"].includes(data) ||
              item["description"].includes(data) ||
              item["category"].includes(data) ||
              item["subcategory"].includes(data)
            )
              this.filteredList.push(item);
          }
        }
        // this.productService
        //   .getSearchProducts("" + data)
        //   .subscribe((data1) => {
        //     console.log(data1);
        //     this.filteredList = <[]>data1;
        //   });
      });
    });
  }
}
