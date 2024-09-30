import {Component, ContentChild, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
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
import {CurrencyPipe, NgTemplateOutlet} from "@angular/common";
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
        NgTemplateOutlet,
        CurrencyPipe
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
    @Output() paymentCompleted = new EventEmitter<void>();
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

        this.paymentService.createPaymentIntent({total: this.amount, session})
        .pipe(
            switchMap(secret => this.stripe.confirmPayment({
                elements: this.paymentElement.elements,
                clientSecret: secret.clientSecret,
                confirmParams: {
                    return_url: window.location.href,
                },
                redirect: "if_required"
            }))
        )
        .subscribe(() => {
            this.paymentCompleted.emit();
        })
    }
}
