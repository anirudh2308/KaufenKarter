import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChartService {
  getProducts() {
    let URL = environment.BASE_URL + "products/";

    return this.http.get(URL);
  }

  getUsers() {
    let URL = environment.BASE_URL + "regdata/";

    return this.http.get(URL);
  }

  getPurchases() {
    let URL = environment.BASE_URL + "purchases/";

    return this.http.get(URL);
  }

  constructor(private http: HttpClient) {}
}
