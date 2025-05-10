import { Component, OnInit } from "@angular/core";
import { UpdateprodService } from "../manageproducts/updateprod.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UpdateselectedprodService } from "./updateselectedprod.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-updateproduct",
  templateUrl: "./updateproduct.component.html",
  styleUrls: ["./updateproduct.component.scss"],
})
export class UpdateproductComponent implements OnInit {
  productForm: FormGroup;
  product: any;

  imgSrc = "./../../../../assets/products/blankproduct.jpg";
  xlArray = [];

  descriptionArray = [];

  updateProduct() {
    this.productForm.value.description = "";

    for (let item of this.descriptionArray)
      if (
        this.descriptionArray.indexOf(item) !=
        this.descriptionArray.length - 1
      )
        this.productForm.value.description += item.name + "$";
      else this.productForm.value.description += item.name;

    let post = {
      name: this.productForm.value.name,
      brand: this.productForm.value.brand,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      category: this.productForm.value.category,
      subcategory: this.productForm.value.subcategory,
      pic: this.imgSrc,
      xlpic: this.xlArray,
      remaining: this.productForm.value.remaining,
      active: "true",
    };

    this.updateService
      .putData(environment.BASE_URL + "products/" + this.product["id"], post)
      .subscribe((data) => {
        this._snackBar.open(
          "Product updated.",
          "Redirecting to main dashboard.",
          {
            duration: 2000,
          }
        );
        this.router.navigate(["/admin/admindash"]);
      });
  }

  removePicture(pic) {
    this.xlArray.splice(this.xlArray.indexOf(pic), 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.descriptionArray.push({ name: value.trim() });
    }

    if (input) {
      input.value = "";
    }

    // console.log(this.descriptionArray);
    // console.log(this.productForm.value.name);
    // console.log(this.productForm.value.price);
    // console.log(this.productForm.value.remaining);
  }

  remove(desc): void {
    const index = this.descriptionArray.indexOf(desc);

    if (index >= 0) {
      this.descriptionArray.splice(index, 1);
    }
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgSrc = <any>event.target.result;
      };
    }
  }

  xlPicInput(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.xlArray.push(<any>event.target.result);
      };
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private prodService: UpdateprodService,
    private updateService: UpdateselectedprodService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.prodService.currentMessage.subscribe((data) => {
      if (data != "") {
        localStorage.setItem("updationitem", JSON.stringify(data));
        this.product = JSON.parse(localStorage.getItem("updationitem"));
      } else this.product = JSON.parse(localStorage.getItem("updationitem"));

      this.productForm = this._formBuilder.group({
        name: ["" + this.product["name"], Validators.required],
        price: ["" + this.product["price"], Validators.required],
        remaining: ["" + this.product["remaining"], Validators.required],
        description: ["" + this.product["description"]],
        brand: ["" + this.product["brand"], Validators.required],
        category: ["" + this.product["category"], Validators.required],
        subcategory: ["" + this.product["subcategory"], Validators.required],
      });

      for (let value of this.productForm.value.description.split("$"))
        this.descriptionArray.push({ name: value.trim() });

      this.imgSrc = this.product["pic"];

      this.xlArray = this.product["xlpic"];
    });
  }
}
