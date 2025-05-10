import { Component, OnInit } from "@angular/core";
import { DisplaycartService } from "./../cart/displaycart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { post, constructor } from "jquery";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { IPayPalConfig, ICreateOrderRequest } from "ngx-paypal";
import { SharedproductserviceService } from "../sharedproductservice.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  cart: any;
  ids = [];
  quant = [];
  items = [];
  subtotal = 0;

  addressForm: FormGroup;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;

  constructor(
    private cartService: DisplaycartService,
    private prodService: SharedproductserviceService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initConfig();
    this.addressForm = this._formBuilder.group({
      address: ["", Validators.required],
      paymentmethod: ["Cash on Delivery"],
    });

    this.cartService
      .pull(JSON.parse(localStorage.getItem("data"))["id"])
      .subscribe((data) => {
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
                this.subtotal += this.items[i]["price"] * this.quant[i];
              }
          });
      });
  }

  checkout() {
    if (this.addressForm.valid) {
      this.prodService.sendNumber(0);
      for (let item of this.items) {
        item["remaining"] -= this.quant[this.items.indexOf(item)];
        if (item["remaining"] == 0) item["active"] = "false";

        this.cartService
          .updateProduct(environment.BASE_URL + "products/" + item["id"], item)
          .subscribe((data) => {});
      }

      let checkoutpost: any;
      this.cartService
        .getPurchases(JSON.parse(localStorage.getItem("data"))["id"])
        .subscribe((data) => {
          checkoutpost = data;
          checkoutpost["order"].push(this.ids);
          checkoutpost["quant"].push(this.quant);
          checkoutpost["total"].push(this.subtotal + this.subtotal * 0.18 + 60);
          checkoutpost["address"].push(this.addressForm.value.address);
          checkoutpost["paymentmethod"].push(
            this.addressForm.value.paymentmethod
          );
          this.cartService
            .postPurchases(
              JSON.parse(localStorage.getItem("data"))["id"],
              checkoutpost
            )
            .subscribe((data) => {
              this.ids = [];
              this.quant = [];
              this.items = [];
              this.cart["order"] = this.ids;
              this.cart["quant"] = this.quant;

              this.cartService
                .updateCart(
                  JSON.parse(localStorage.getItem("data"))["id"],
                  this.cart
                )
                .subscribe((data) => {
                  this.subtotal = 0;
                  this._snackBar.open(
                    "Order confirmed!",
                    "Thanks for shopping with us.",
                    {
                      duration: 3000,
                    }
                  );
                  this.router.navigate(["/user/userdash/thanks"]);
                });
            });
        });
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: "EUR",
      clientId: "sb",
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: "9.99",
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: "9.99",
                  },
                },
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "EUR",
                    value: "9.99",
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: "true",
      },
      style: {
        label: "paypal",
        layout: "vertical",
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err) => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      },
    };
  }
}
