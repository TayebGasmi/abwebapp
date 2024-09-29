import {Component, ContentChild, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {NgTemplateOutlet} from "@angular/common";
import {SessionDto} from "../../core/models/session";

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
    ButtonDirective,
    NgTemplateOutlet
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
  @ContentChild("payButton")
  payButton!: TemplateRef<any>
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

  pay(session: SessionDto) {
    this.paymentElement.elements.submit().then()
    this.paymentService.createPaymentIntent(
      {
        total: 50000,
        session
      }
    ).pipe(switchMap(secret => this.stripe
    .confirmPayment({
      elements: this.paymentElement.elements,
      clientSecret: secret.clientSecret,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required"
    })))
    .subscribe(
    )
  }
}
