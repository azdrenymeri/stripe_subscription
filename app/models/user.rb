class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable

  before_create :create_stripe_customer


  private
  
  def create_stripe_customer
    customer = Stripe::Customer.create({
      email: self.email
    })
    self.customer_id = customer.id
  end
end
