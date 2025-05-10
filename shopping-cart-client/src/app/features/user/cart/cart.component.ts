import { Component, OnInit } from "@angular/core";
import { DisplaycartService } from "./displaycart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SharedproductserviceService } from "../sharedproductservice.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: any;
  ids = [];
  quant = [];
  items = [];
  total = 0;

  loaded = false;

  constructor(
    private prodService: SharedproductserviceService,
    private cartService: DisplaycartService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  triggercheckout() {
    let allactive = true;
    for (let item of this.items)
      if (item["active"] == "false") {
        allactive = false;
        break;
      }
    if (allactive == false)
      this._snackBar.open(
        "Can't checkout.",
        "Please delete out of stock items.",
        {
          duration: 3000,
        }
      );
    else {
      this.router.navigate(["/user/userdash/checkout"]);
    }
  }

  deleteFromCart(i) {
    this.prodService.sendNumber(-1);
    this.total = 0;

    this.ids.splice(i, 1);
    this.quant.splice(i, 1);
    this.items.splice(i, 1);
    this.cart["order"] = this.ids;
    this.cart["quant"] = this.quant;

    for (let j = 0; j < this.items.length; j++) {
      this.total += this.items[j]["price"] * this.quant[j];
    }

    this.cartService
      .updateCart(JSON.parse(localStorage.getItem("data"))["id"], this.cart)
      .subscribe((data) => {
        // console.log(this.ids);
        // console.log(this.quant);
      });
  }

  ngOnInit(): void {
    this.cartService
      .pull(JSON.parse(localStorage.getItem("data"))["id"])
      .subscribe((data) => {
        setTimeout(() => {
          this.loaded = true;
        }, 1000);
        this.cart = data;
        this.ids = data["order"];
        this.quant = data["quant"];
        // console.log(this.ids);
        // console.log(this.quant);

        for (let i of this.ids)
          this.cartService.getProduct(i).subscribe((data) => {
            this.items.push(data);
            // console.log(this.items);
            // console.log(this.items[i]["price"]);
            // console.log(this.quant[i]);
            if (i == this.ids[this.ids.length - 1])
              for (let i = 0; i < this.items.length; i++) {
                this.total += this.items[i]["price"] * this.quant[i];
              }
          });
      });
  }
}
