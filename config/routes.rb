Rails.application.routes.draw do

    root 'products#index'
    
    resources :users, :products

    # get 'products/new'
    #
    # get 'products/index'
    #
    # get 'products/create'
    #
    # get 'products/edit'
end
