import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "form", "selectedPrice" ]

  handleSubmit(e){
    e.preventDefault();
    this.selectedPriceTarget.value = e.target.id;
    this.formTarget.submit();
  }
}