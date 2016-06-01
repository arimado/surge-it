Rails.application.routes.draw do

    root 'products#index'
    resources :users, :products
    get 'products/api/orders' => 'products#api_orders'

    # post 'orders' => 'products#api_orders', :as => 'orders_path_url'

    # get 'products/new'
    #
    # get 'products/index'
    #
    # get 'products/create'
    #
    # get 'products/edit'
end
