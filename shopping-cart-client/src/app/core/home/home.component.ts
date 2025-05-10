import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem("remember") == "true") {
      let data = JSON.parse(localStorage.getItem("data"));
      if (data["role"] == "Admin") this.router.navigate(["/admin/admindash"]);
      else this.router.navigate(["/user/userdash"]);
    }
  }
}
