import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  rememberme = false;
  success = false;
  failure = false;
  message = "";
  loader = false;

  ngOnInit(): void {
    this.success = false;
    this.failure = false;
    this.message = "";
  }

  logingroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", Validators.required),
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.logingroup.controls[controlName].hasError(errorName);
  };

  setRemember() {
    this.rememberme = !this.rememberme;
  }

  tryLogin() {
    if (this.logingroup.valid) {
      let details = {
        email: this.logingroup.value.email,
        password: this.logingroup.value.password,
      };
      this.loader = true;
      this.loginService.login(details).subscribe((data) => {
        if ((<[]>data).length != 0) {
          console.log(this.logingroup.value.email);
          console.log(data[0]["email"]);
          console.log(this.logingroup.value.password);
          console.log(
            CryptoJS.AES.decrypt(
              data[0]["password"].trim(),
              "encryption123".trim()
            ).toString(CryptoJS.enc.Utf8)
          );
          console.log(data[0]["role"]);
          if (
            data[0]["email"] == this.logingroup.value.email &&
            this.logingroup.value.password ==
              CryptoJS.AES.decrypt(
                data[0]["password"].trim(),
                "encryption123".trim()
              ).toString(CryptoJS.enc.Utf8)
          ) {
            if (data[0]["role"] === "Admin") {
              this.success = true;
              this.failure = false;
              this.message =
                "Successful login! Welcome, " + data[0]["name"] + ".";
              localStorage.setItem("data", JSON.stringify(data[0]));
              localStorage.setItem("remember", "" + this.rememberme);
              localStorage.setItem("isAdmin", "true");

              setTimeout(() => {
                this.router.navigate(["/admin/admindash"]);
              }, 3000);
            } else if (data[0]["role"] === "User") {
              this.success = true;
              this.failure = false;
              this.message =
                "Successful login! Welcome, " + data[0]["name"] + ".";
              localStorage.setItem("data", JSON.stringify(data[0]));
              localStorage.setItem("remember", "" + this.rememberme);
              localStorage.setItem("isUser", "true");

              setTimeout(() => {
                this.router.navigate(["/user/userdash"]);
              }, 3000);
            }
          } else {
            this.loader = false;
            this.failure = true;
            this.message = "Email/Password incorrect.";
          }
        } else {
          this.loader = false;
          this.failure = true;
          this.message = "Email doesn't exist.";
        }
      });
    }
  }
}
