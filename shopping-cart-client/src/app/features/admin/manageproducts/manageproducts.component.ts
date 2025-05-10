import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import { CrudproductService } from "./crudproduct.service";
import { Router } from "@angular/router";
import { UpdateprodService } from "./updateprod.service";

@Component({
  selector: "app-manageproducts",
  templateUrl: "./manageproducts.component.html",
  styleUrls: ["./manageproducts.component.scss"],
})
export class ManageproductsComponent implements OnInit {
  allProducts: any;
  activeProducts = [];
  inactiveProducts = [];

  loaded = false;

  triggerUpdate(product) {
    this.updateProdService.changeMessage(product);
    this.router.navigate(["/admin/admindash/updateproduct"]);
  }

  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer != event.container)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    // moveItemInArray(
    //   this.activeProducts,
    //   event.previousIndex,
    //   event.currentIndex
    // );
    // moveItemInArray(
    //   this.inactiveProducts,
    //   event.previousIndex,
    //   event.currentIndex
    // );

    for (let item of this.activeProducts)
      if (item["active"] == "false") {
        item["active"] = "true";

        this.crudService.updateProduct(item["id"], item).subscribe((data) => {
          console.log(this.activeProducts);
          console.log(this.inactiveProducts);
        });
      }

    for (let item of this.inactiveProducts)
      if (item["active"] == "true") {
        item["active"] = "false";

        this.crudService.updateProduct(item["id"], item).subscribe((data) => {
          console.log(this.activeProducts);
          console.log(this.inactiveProducts);
        });
      }
  }

  constructor(
    private crudService: CrudproductService,
    private updateProdService: UpdateprodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crudService.getProducts().subscribe((data) => {
      setTimeout(() => {
        this.loaded = true;
      }, 1000);
      this.allProducts = data;

      for (let item of this.allProducts) {
        if (item["active"] == "true") this.activeProducts.push(item);
        else this.inactiveProducts.push(item);
      }
    });
  }
}
