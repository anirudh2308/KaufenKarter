import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DisplaycartService } from "../cart/displaycart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import "jspdf-autotable";

declare const require: any;
const jsPDF = require("jspdf");
require("jspdf-autotable");

@Component({
  selector: "app-pastorders",
  templateUrl: "./pastorders.component.html",
  styleUrls: ["./pastorders.component.scss"],
})
export class PastordersComponent implements OnInit {
  @ViewChild("content") content: ElementRef;
  orders = [];
  items = [];
  quant = [];
  total = [];
  address = [];
  paymentmethod = [];

  constructor(
    private cartService: DisplaycartService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  public downloadPDF(i) {
    let invoicebody = [];

    let subtot = 0;
    let tot = 0;

    for (let item of this.items[i]) {
      let temp = [];
      temp.push(item["name"]);
      temp.push("Rs." + item["price"]);
      temp.push(this.quant[i][this.items[i].indexOf(item)]);
      temp.push(
        "Rs." + this.quant[i][this.items[i].indexOf(item)] * item["price"]
      );
      subtot += +this.quant[i][this.items[i].indexOf(item)] * item["price"];
      invoicebody.push(temp);
    }

    tot = subtot + 0.18 * subtot + 60;

    let doc = new jsPDF("l", "mm");
    let specialElementHandlers = {
      "#editor": function (element, renderer) {
        return true;
      },
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 150,
      elementHandlers: specialElementHandlers,
    });

    doc.text(15, 30, "Order Summary:");
    doc.autoTable({
      head: [["Product", "Price", "Quantity", "Total"]],
      margin: { top: 60, bottom: 50 },
      body: invoicebody,
    });

    let finalY = doc.lastAutoTable.finalY + 20; // The y position on the page
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(220, finalY, "Subtotal: Rs." + subtot);
    doc.text(220, finalY + 7, "GST: 18% (Rs." + subtot * 0.18 + ")");
    doc.text(220, finalY + 14, "Delivery Charges: Rs.60");
    doc.text(220, finalY + 21, "Total: Rs." + tot);
    doc.text(220, finalY + 28, "Payment via: " + this.paymentmethod[i]);
    doc.text(15, finalY, "Shipping Address: " + this.address[i]);

    doc.setLineWidth(0.5);
    doc.rect(10, 20, 280, finalY + 21);

    // doc.addImage("", "PNG", 15, 40, 200, 114);

    doc.save("invoice.pdf");
  }

  ngOnInit(): void {
    this.cartService
      .getPurchases(JSON.parse(localStorage.getItem("data"))["id"])
      .subscribe((data) => {
        this.orders = data["order"];
        this.quant = data["quant"];
        this.total = data["total"];
        this.address = data["address"];
        this.paymentmethod = data["paymentmethod"];

        for (let order of this.orders) {
          let itemsperorder = [];
          for (let i of order) {
            this.cartService.getProduct(i).subscribe((data) => {
              itemsperorder.push(data);
            });
          }
          this.items.push(itemsperorder);
        }

        console.log(this.orders);
        console.log(this.quant);
        console.log(this.total);
        console.log(this.address);
        console.log(this.paymentmethod);
        console.log(this.items);
      });
  }
}
