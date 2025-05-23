import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(details) {
    let URL = environment.BASE_URL + "regdata?email=" + details["email"];

    return this.http.get(URL);
  }
}
