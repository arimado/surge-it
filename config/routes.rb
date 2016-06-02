Rails.application.routes.draw do


    root 'products#index'
    resources :users, :products, :orders
    get 'api/products/:id/orders' => 'orders#api_orders'
    post 'api/products/:id/orders/create' => 'orders#api_create_order'
    get 'products/:id/details' => 'products#details'

    # post 'orders' => 'products#api_orders', :as => 'orders_path_url'

    # get 'order/index'
    #
    # get 'order/show'
    #
    # get 'order/new'
    #
    # get 'order/create'

    # get 'products/new'
    #
    # get 'products/index'
    #
    # get 'products/create'
    #
    # get 'products/edit'
end
