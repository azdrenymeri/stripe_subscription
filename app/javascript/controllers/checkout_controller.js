import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['form', 'clientSecret','email','cardElement','cardError']

  initialize(){
    // bindings of `this` to the functions
    this._handleCardError = this._handleCardError.bind(this);
    this.stripe = Stripe("pk_test_51J3HG4ItGR9LPQvQKQlFXkTuOYuWxAvD1FVqdnbXs5RzhEH1900r4QlYa1qxzB8I5GqOMaVDPbqavgRbhe2rwDRC00Y9Zakjcs");
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card', {
      style:
      {
        base: {
          lineHeight: '1.429'
        }
      },
      classes: {
        base: 'input'
      }
    });
    this.card.mount(`#${this.cardElementTarget.getAttribute("id")}`);
    this.card.on("change", this._handleCardError);
  }

  handleCheckout(e) {
    e.preventDefault();
    this.stripe.confirmCardPayment(this.clientSecretTarget.value, {
      payment_method: {
        card: this.card,
        billing_details: {
          email: this.emailTarget.value
        }
      }
    }).then(result => {
      if(result.error){
        alert(result.error.message);
      } else {
        alert("Payment processed successfuly");
        this._disableFormElements();
        this.formTarget.submit();
      }
    }).catch(err => {
        if (err){
          alert(err.message);
        }
      })
  }

  _handleCardError(event){
    if(event.error){
      this.cardErrorTarget.textContent = event.error.message;
    } else {
      this.cardErrorTarget.textContent = '';
    }
  }
  _disableFormElements(){
    Array.from(this.formTarget.elements).forEach(formElement => formElement.disabled = true);
  }
}