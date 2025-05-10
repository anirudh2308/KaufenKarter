import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DisplaycartService {
  constructor(private http: HttpClient) {}

  pull(id) {
    let URL = environment.BASE_URL + "cart/" + id;

    return this.http.get(URL);
  }

  getProduct(id) {
    let URL = environment.BASE_URL + "products/" + id;

    return this.http.get(URL);
  }

  updateProduct(URL, post) {
    return this.http.put(URL, post);
  }

  updateCart(id, post) {
    let URL = environment.BASE_URL + "cart/" + id;
    return this.http.put(URL, post);
  }

  getPurchases(id) {
    let URL = environment.BASE_URL + "purchases/" + id;
    return this.http.get(URL);
  }

  postPurchases(id, post) {
    let URL = environment.BASE_URL + "purchases/" + id;
    return this.http.put(URL, post);
  }
}
