class StaticPagesController < ApplicationController
  before_action :authenticate_user!
  def index
    if current_user.price_id
      @price = Stripe::Price.retrieve({
        id: current_user.price_id,
        expand: ['product']
      })
    end
  end
end
