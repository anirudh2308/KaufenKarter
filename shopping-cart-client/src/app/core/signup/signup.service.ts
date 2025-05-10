import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

//Backend using JSON Sever, Frontend using Angular/Bootstrap/CSS/HTML/Material[Didn't use MongoDB/Express/NodeJS]
@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor(private http: HttpClient) {}

  URL = environment.BASE_URL + "regdata/";

  postData(post) {
    return this.http.post(this.URL, post);
  }

  postToCart(skeleton) {
    let URL1 = environment.BASE_URL + "cart/";
    return this.http.post(URL1, skeleton);
  }

  postToPurchases(skeleton) {
    let URL2 = environment.BASE_URL + "purchases/";
    return this.http.post(URL2, skeleton);
  }
}
