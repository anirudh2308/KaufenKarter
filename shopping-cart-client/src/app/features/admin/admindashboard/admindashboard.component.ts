import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { phoneValidator } from "src/app/shared/validation/validator";
import { environment } from "src/environments/environment";
import * as CryptoJS from "crypto-js";
import { UpdateprofileService } from "../../user/userdashboard/updateprofile.service";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss"],
})
export class AdmindashboardComponent implements OnInit {
  userdata: any;
  oldkey = "";
  imgSrc: "";

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

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgSrc = <any>event.target.result;
      };
    }
  }
  logout() {
    this.userdata = null;
    localStorage.clear();
    this.router.navigate(["/core/home"]);
  }

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

  constructor(
    private router: Router,
    private updateService: UpdateprofileService
  ) {}

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
}
