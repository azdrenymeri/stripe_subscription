Rails.application.routes.draw do
  root to: 'static_pages#index'
  devise_for :users
  resources :plans, only: [:index, :create] do 
    member do 
      get 'checkout'
    end
  end
end
