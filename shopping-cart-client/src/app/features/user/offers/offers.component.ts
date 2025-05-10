import { Component, OnInit } from "@angular/core";
import { SharedproductserviceService } from "../sharedproductservice.service";
import { Router } from "@angular/router";
import { ProductService } from "../products/product.service";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.scss"],
})
export class OffersComponent implements OnInit {
  newMessage(id) {
    this.productService.getParticularProduct(id).subscribe((data) => {
      this.prodService.changeMessage(data);
      this.router.navigate(["/user/userdash/productinfo"]);
    });
  }

  constructor(
    private prodService: SharedproductserviceService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}
}
