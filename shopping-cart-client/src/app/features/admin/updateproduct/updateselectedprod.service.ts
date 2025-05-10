import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UpdateselectedprodService {
  constructor(private http: HttpClient) {}

  putData(URL, post) {
    return this.http.put(URL, post);
  }
}
