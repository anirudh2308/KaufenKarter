import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import "jspdf-autotable";
import { DisplaycartService } from "./../cart/displaycart.service";

declare const require: any;
const jsPDF = require("jspdf");
require("jspdf-autotable");

@Component({
  selector: "app-thankspage",
  templateUrl: "./thankspage.component.html",
  styleUrls: ["./thankspage.component.scss"],
})
export class ThankspageComponent implements OnInit {
  @ViewChild("content") content: ElementRef;

  items = [];
  orders: any;
  quant: any;
  total: any;
  address: any;
  paymentmethod: any;

  invoicebody = [];
  subtot = 0;

  public downloadPDF() {
    for (let item of this.items) {
      let temp = [];
      temp.push(item["name"]);
      temp.push("Rs." + item["price"]);
      temp.push(this.quant[this.items.indexOf(item)]);
      temp.push("Rs." + this.quant[this.items.indexOf(item)] * item["price"]);
      this.subtot += +this.quant[this.items.indexOf(item)] * item["price"];
      this.invoicebody.push(temp);
    }

    this.total = this.subtot + 0.18 * this.subtot + 60;

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
      body: this.invoicebody,
    });

    let finalY = doc.lastAutoTable.finalY + 20; // The y position on the page
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(220, finalY, "Subtotal: Rs." + this.subtot);
    doc.text(220, finalY + 7, "GST: 18% (Rs." + this.subtot * 0.18 + ")");
    doc.text(220, finalY + 14, "Delivery Charges: Rs.60");
    doc.text(220, finalY + 21, "Total: Rs." + this.total);
    doc.text(220, finalY + 28, "Payment via: " + this.paymentmethod);
    doc.text(15, finalY, "Shipping Address: " + this.address);

    doc.setLineWidth(0.5);
    doc.rect(10, 20, 280, finalY + 21);

    // doc.addImage("", "PNG", 15, 40, 200, 114);

    doc.save("invoice.pdf");
  }
  constructor(private cartService: DisplaycartService) {}

  ngOnInit(): void {
    this.cartService
      .getPurchases(JSON.parse(localStorage.getItem("data"))["id"])
      .subscribe((data) => {
        this.orders = data["order"][data["order"].length - 1];
        this.quant = data["quant"][data["quant"].length - 1];
        this.total = data["total"][data["total"].length - 1];
        this.address = data["address"][data["address"].length - 1];
        this.paymentmethod =
          data["paymentmethod"][data["paymentmethod"].length - 1];
        for (let i of this.orders)
          this.cartService.getProduct(i).subscribe((data) => {
            this.items.push(data);
          });
      });
  }
}
