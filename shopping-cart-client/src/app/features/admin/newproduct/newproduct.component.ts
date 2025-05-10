import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatChipInputEvent } from "@angular/material/chips";
import { AddproductService } from "./addproduct.service";

@Component({
  selector: "app-newproduct",
  templateUrl: "./newproduct.component.html",
  styleUrls: ["./newproduct.component.scss"],
})
export class NewproductComponent implements OnInit {
  productForm: FormGroup;
  imgSrc = "./../../../../assets/products/blankproduct.jpg";
  xlArray = [];

  descriptionArray = [];

  addProduct() {
    if (this.productForm.valid) {
      for (let item of this.descriptionArray)
        if (
          this.descriptionArray.indexOf(item) !=
          this.descriptionArray.length - 1
        )
          this.productForm.value.description += item.name + "$";
        else this.productForm.value.description += item.name;

      console.log(this.imgSrc.substr(0, 5));
      console.log(this.xlArray.length);
      console.log(this.productForm.value.name);
      console.log(this.productForm.value.brand);
      console.log(this.productForm.value.price);
      console.log(this.productForm.value.category);
      console.log(this.productForm.value.subcategory);
      console.log(this.productForm.value.remaining);
      console.log(this.productForm.value.description);

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

      this.addProductService.postProduct(post).subscribe((data) => {
        this._snackBar.open(
          "Product added.",
          "Redirecting to main dashboard.",
          {
            duration: 2000,
          }
        );
        this.router.navigate(["/admin/admindash"]);
      });
    }
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
    private addProductService: AddproductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      name: ["", Validators.required],
      price: ["", Validators.required],
      remaining: ["", Validators.required],
      description: [""],
      brand: ["", Validators.required],
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
    });
  }
}
