import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SessionDto} from "../models/session";
import {SchoolYear} from "../models/school-year";
import {SchoolType} from "../models/school-type";

@Injectable({
  providedIn: 'root'
})
export class SessionBookLandingService {

  private session = new BehaviorSubject<SessionDto & { schoolYear: SchoolYear, schoolType: SchoolType } | null>(null);
  currentMessage = this.session.asObservable();
  private isFromComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  completed: Observable<boolean> = this.isFromComplete.asObservable();

  changeMessage(session: SessionDto & { schoolYear: any, schoolType: any } | null, isCompleted: boolean) {
    this.session.next(session);
    this.isFromComplete.next(isCompleted);
  }
}
