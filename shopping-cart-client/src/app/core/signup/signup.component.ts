import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { SignupService } from "./signup.service";
import * as CryptoJS from "crypto-js";
import { Router } from "@angular/router";
import { Validators } from "@angular/forms";
import {
  phoneValidator,
  passValidator,
} from "../../shared/validation/validator";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  loader = false;

  maxDate: Date;
  imgSrc = "./../../../assets/profpic/profavatarmale.png";

  skillList: string[] = [
    "English",
    "Hindi",
    "Bengali",
    "German",
    "French",
    "Japanese",
    "Korean",
    "Punjabi",
    "Gujarati",
    "Marathi",
    "Mexican",
    "Tamil",
    "Kannada",
    "Telugu",
  ];

  submitAll() {
    if (this.firstFormGroup.valid && this.firstFormGroup.valid) {
      this.loader = true;
      console.log(this.firstFormGroup.value.name);
      console.log(this.firstFormGroup.value.gender);
      console.log(this.firstFormGroup.value.dob);
      console.log(this.firstFormGroup.value.skills);
      console.log(this.firstFormGroup.value.phone);
      console.log(this.secondFormGroup.value.email);
      console.log(
        CryptoJS.AES.encrypt(
          this.secondFormGroup.value.password.trim(),
          "encryption123".trim()
        ).toString()
      );

      let skeleton = {
        order: [],
        quant: [],
      };

      let skeleton1 = {
        order: [],
        quant: [],
        total: [],
        address: [],
        paymentmethod: [],
      };

      let post = {
        name: this.firstFormGroup.value.name,
        gender: this.firstFormGroup.value.gender,
        dob: this.firstFormGroup.value.dob.toString().substring(4, 15),
        phone: this.firstFormGroup.value.phone,
        skills: this.firstFormGroup.value.skills,
        email: this.secondFormGroup.value.email,
        password: CryptoJS.AES.encrypt(
          this.secondFormGroup.value.password.trim(),
          "encryption123".trim()
        ).toString(),
        prof: this.imgSrc,
        role: "User",
        addresses: [],
      };

      this.signupService.postData(post).subscribe(
        (data) => {
          this._snackBar.open("Signup Successful!", "Redirecting to Login.", {
            duration: 4000,
          });
          console.log(data);

          this.signupService.postToCart(skeleton).subscribe((data) => {
            this.signupService
              .postToPurchases(skeleton1)
              .subscribe((data) => {});
          });

          setTimeout(() => {
            this.router.navigate(["/core/login"]);
          }, 3000);
        },
        (error) => {
          this.loader = false;
          this._snackBar.open("Signup Failed.", "Check Server Connection.", {
            duration: 4000,
          });
        }
      );
    }
  }
  public hasError1 = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  };

  public hasError2 = (controlName: string, errorName: string) => {
    return this.secondFormGroup.controls[controlName].hasError(errorName);
  };

  public onDate(event): void {
    this.firstFormGroup.value.dob = event;
  }

  changeImage() {
    if (!this.imgSrc.startsWith("data:image", 0)) {
      if (this.firstFormGroup.value.gender == "Male")
        this.imgSrc = "./../../../assets/profpic/profavatarmale.png";
      if (this.firstFormGroup.value.gender == "Female")
        this.imgSrc = "./../../../assets/profpic/profavatarfemale.png";
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

  constructor(
    private router: Router,
    private signupService: SignupService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      gender: ["Male"],
      dob: [""],
      skills: [""],
      phone: ["", phoneValidator],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required],
      cnfpass: ["", passValidator],
    });
  }
}
