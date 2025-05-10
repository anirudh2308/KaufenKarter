import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import * as CryptoJS from "crypto-js";
import { Router } from "@angular/router";
import { Validators } from "@angular/forms";
import { UpdateprofileService } from "./updateprofile.service";
import { phoneValidator } from "./../../../shared/validation/validator";
import { environment } from "src/environments/environment";
import { SharedproductserviceService } from "../sharedproductservice.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-userdashboard",
  templateUrl: "./userdashboard.component.html",
  styleUrls: ["./userdashboard.component.scss"],
})
export class UserdashboardComponent implements OnInit {
  // maxDate: any;
  // public onDate(event): void {
  //   this.updatedform.value.dob = event;
  // }
  cartcount = 0;
  subscription: Subscription;
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

  constructor(
    private router: Router,
    private updateService: UpdateprofileService,
    private searchService: SharedproductserviceService
  ) {
    this.cartcount = +localStorage.getItem("cartcount");
    this.subscription = this.searchService.getNumber().subscribe((number) => {
      if (number != 0) this.cartcount += number;
      else this.cartcount = 0;
      localStorage.setItem("cartcount", "" + this.cartcount);
      console.log(this.cartcount);
    });
  }

  userdata: any;
  oldkey = "";

  search() {
    // console.log(this.searchForm.value.search);
    this.searchService.searchChangeMessage(this.searchForm.value.search);
    this.router.navigate(["/user/userdash/products"]);
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

  imgSrc: "";

  searchForm = new FormGroup({ search: new FormControl("") });

  updatedform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [Validators.email]),
    password: new FormControl(""),
    phone: new FormControl("", phoneValidator),
    skills: new FormControl(""),
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.updatedform.controls[controlName].hasError(errorName);
  };

  onUpdate() {
    if (this.updatedform.valid) {
      if (this.imgSrc != this.userdata["prof"])
        this.userdata["prof"] = this.imgSrc;
      if (this.updatedform.value.name != "")
        this.userdata["name"] = this.updatedform.value.name;
      if (this.updatedform.value.email != "")
        this.userdata["email"] = this.updatedform.value.email;
      if (this.updatedform.value.phone != "")
        this.userdata["phone"] = this.updatedform.value.phone;
      if (this.updatedform.value.skills != "")
        this.userdata["skills"] = this.updatedform.value.skills;
      if (this.updatedform.value.password != "")
        this.userdata["password"] = CryptoJS.AES.encrypt(
          this.updatedform.value.password.trim(),
          "encryption123".trim()
        ).toString();

      let post = {
        name: this.userdata["name"],
        gender: this.userdata["gender"],
        dob: this.userdata["dob"],
        phone: this.userdata["phone"],
        skills: this.userdata["skills"],
        email: this.userdata["email"],
        password: this.userdata["password"],
        prof: this.imgSrc,
        role: this.userdata["role"],
      };

      // if (this.userdata["email"] == this.oldkey)
      this.updateService
        .putData(environment.BASE_URL + "regdata/" + this.oldkey, post)
        .subscribe((data) => {
          console.log(data);
          console.log(this.userdata);
          localStorage.setItem("data", JSON.stringify(this.userdata));
          location.reload();
        });
      // else {
      //   this.updateService
      //     .deleteData("http://localhost:3000/regdata/" + this.oldkey)
      //     .subscribe((data) => {
      //       console.log(data);
      //     });

      //   this.updateService.postData(post).subscribe((data) => {
      //     console.log(data);
      //   });
      // }
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem("refresh") == "1") {
      localStorage.removeItem("refresh");
    } else {
      localStorage.setItem("refresh", "1");
      location.reload();
    } //for refreshing the page, solving the mat-label whitening.

    this.userdata = JSON.parse(localStorage.getItem("data"));
    this.oldkey = this.userdata["id"];
    this.imgSrc = this.userdata["prof"];

    console.log(this.userdata);
  }

  logout() {
    this.userdata = null;
    localStorage.clear();
    this.router.navigate(["/core/home"]);
  }
}
