import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UpdateprofileService {
  constructor(private http: HttpClient) {}

  // postData(post) {
  //   return this.http.post(this.URL, post);
  // }

  putData(URL1, post) {
    return this.http.put(URL1, post);
  }

  // deleteData(URL2) {
  //   return this.http.delete(URL2);
  // }
}
