class PlansController < ApplicationController
  before_action :authenticate_user!

  def index
    @prices = Stripe::Price.list({active: true, expand: ['data.product']})
  end

  def create
    subscription = Stripe::Subscription.create({
      customer: current_user.customer_id,
      items: [
        price: params[:price_id]
      ], 
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']    
    })

    current_user.subscription_id = subscription.id
    current_user.save!

    redirect_to checkout_plan_path(subscription.latest_invoice.payment_intent.client_secret)
  end

  def checkout
    @client_secret = params[:id]
  end
end
