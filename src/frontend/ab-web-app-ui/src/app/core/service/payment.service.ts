import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Payment} from "../models/payment";
import {Observable} from "rxjs";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})

export class PaymentService extends BaseService<Payment, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/payment`;
    super(http, url);
  }

  createPaymentIntent(paymentDto: Partial<Payment>): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${baseUrl}/payment/create-intent`, paymentDto);
  }

}
