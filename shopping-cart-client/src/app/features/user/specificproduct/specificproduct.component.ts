import { Component, OnInit } from "@angular/core";
import { SharedproductserviceService } from "../sharedproductservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddcartserviceService } from "./addcartservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-specificproduct",
  templateUrl: "./specificproduct.component.html",
  styleUrls: ["./specificproduct.component.scss"],
})
export class SpecificproductComponent implements OnInit {
  constructor(
    private prodService: SharedproductserviceService,
    private _snackBar: MatSnackBar,
    private addService: AddcartserviceService,
    private router: Router
  ) {}

  alreadyincart = false;
  cart: any;
  count = 1;
  product: any;

  indArray = [];

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
        cart["quant"].push(this.count);

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

  addToCart() {
    if (this.count > this.product["remaining"])
      this._snackBar.open(
        "Can't add to cart.",
        "Can't select more than " + this.product["remaining"] + " products.",
        {
          duration: 2000,
        }
      );
    else {
      this.prodService.sendNumber(1);
      this.addService
        .pull(JSON.parse(localStorage.getItem("data"))["id"])
        .subscribe((data) => {
          this.cart = data;
          // console.log(this.cart["order"]);
          // console.log(this.product["id"]);
          // console.log(this.count);
          this.cart["order"].push(this.product["id"]);
          this.cart["quant"].push(this.count);

          this.addService
            .push(JSON.parse(localStorage.getItem("data"))["id"], this.cart)
            .subscribe((data) => {
              this.cart = data;
              console.log(this.cart);
            });
        });

      this._snackBar.open(
        "Product added!",
        "Feel free to browse more products!",
        {
          duration: 2000,
        }
      );

      this.alreadyincart = true;
    }
  }

  incQuant() {
    this.count += 1;
  }
  decQuant() {
    if (this.count > 1) this.count -= 1;
  }

  ngOnInit(): void {
    this.prodService.currentMessage.subscribe((data) => {
      if (data != "") {
        localStorage.setItem("product", JSON.stringify(data));
        this.product = JSON.parse(localStorage.getItem("product"));
      } else this.product = JSON.parse(localStorage.getItem("product"));

      for (let i = 0; i < this.product["xlpic"].length; i++)
        this.indArray.push(i);

      this.indArray.splice(0, 1);
      // console.log(data == "");
      // console.log(this.product == "");
    });
  }
}
