import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedproductserviceService {
  private messageSource = new BehaviorSubject<any>("");
  currentMessage = this.messageSource.asObservable();

  private searchMessageSource = new BehaviorSubject<any>("");
  searchCurrentMessage = this.searchMessageSource.asObservable();

  constructor() {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  searchChangeMessage(message: any) {
    this.searchMessageSource.next(message);
  }

  private subject = new Subject<any>();

  sendNumber(count: number) {
    this.subject.next(count);
  }

  getNumber(): Observable<any> {
    return this.subject.asObservable();
  }
}
