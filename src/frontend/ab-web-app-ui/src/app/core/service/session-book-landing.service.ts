import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SessionDto} from "../models/session";

@Injectable({
  providedIn: 'root'
})
export class SessionBookLandingService {

  // BehaviorSubject with initial value
  private session = new BehaviorSubject<any>({});
  private isFromComplete :BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  // Observable that components will subscribe to
  currentMessage = this.session.asObservable();
  completed:Observable<boolean> =this.isFromComplete.asObservable();
  // Method to change the message
  changeMessage(session: any,iscomplete:boolean) {
    this.session.next(session); // Emits the new message to all subscribers
    this.isFromComplete.next(iscomplete); // Emits the new message to all subscribers
  }
}
