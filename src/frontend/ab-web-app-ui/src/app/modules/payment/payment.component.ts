import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  injectStripe,
  StripeElementsDirective,
  StripeIssuingCardCvcDisplayComponent,
  StripeIssuingCardExpiryDisplayComponent,
  StripeIssuingCardNumberDisplayComponent,
  StripeIssuingCardPinDisplayComponent,
  StripePaymentElementComponent
} from "ngx-stripe";
import {StripeElementsOptions, StripePaymentElementOptions} from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {ButtonDirective} from "primeng/button";
import {PaymentService} from "../../core/service/payment.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    StripeElementsDirective,
    StripePaymentElementComponent,
    StripeIssuingCardNumberDisplayComponent,
    StripeIssuingCardExpiryDisplayComponent,
    StripeIssuingCardCvcDisplayComponent,
    StripeIssuingCardPinDisplayComponent,
    ButtonDirective
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  stripe = injectStripe(environment.STRIPE_PK);
  paymentService = inject(PaymentService);
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  @Input() amount!: number;
  elementsOptions!: StripeElementsOptions;
  isPaymentReady = false;
  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  ngOnInit() {
    this.elementsOptions = {
      locale: 'auto',
      mode: "payment",
      amount: this.amount || 1000,
      currency: "usd"
    };
  }

  onPaymentElementReady() {
    this.isPaymentReady = true;
  }

  pay() {
    this.paymentElement.elements.submit()
    this.paymentService.createPaymentIntent(
      {
        total: 50000,
      }
    ).pipe(switchMap(secret => this.stripe
    .confirmPayment({
      elements: this.paymentElement.elements,
      clientSecret: secret.clientSecret,
        confirmParams: {
          mandate_data:{},
          return_url:window.location.href ,
        },
      redirect: "if_required"
    })))
    .subscribe(
      r => console.log(r)
    )
  }
}
