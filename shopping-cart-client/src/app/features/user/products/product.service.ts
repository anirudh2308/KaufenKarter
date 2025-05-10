import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    let URL = environment.BASE_URL + "products/";

    return this.http.get(URL);
  }

  getSearchProducts(query) {
    let URL =
      environment.BASE_URL +
      "products/?q=" +
      query +
      "&attr=name,brand,description,category,subcategory";

    return this.http.get(URL);
  }

  getParticularProduct(id) {
    let URL = environment.BASE_URL + "products/" + id;

    return this.http.get(URL);
  }
}
