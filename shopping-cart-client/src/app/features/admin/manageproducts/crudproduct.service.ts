import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CrudproductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    let URL = environment.BASE_URL + "products/";

    return this.http.get(URL);
  }

  updateProduct(id, post) {
    let URL = environment.BASE_URL + "products/" + id;
    return this.http.put(URL, post);
  }
}
