import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AddcartserviceService {
  constructor(private http: HttpClient) {}

  pull(id) {
    let URL = environment.BASE_URL + "cart/" + id;

    return this.http.get(URL);
  }

  push(id, post) {
    let URL = environment.BASE_URL + "cart/" + id;

    return this.http.put(URL, post);
  }
}
