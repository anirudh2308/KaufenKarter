import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AddproductService {
  URL = environment.BASE_URL + "products/";

  postProduct(post) {
    return this.http.post(this.URL, post);
  }

  constructor(private http: HttpClient) {}
}
