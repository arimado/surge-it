class OrdersController < ApplicationController
  def new
  end

  def index
  end

  # t.text     "product_id"
  # t.decimal  "price"
  # t.decimal  "price_base"
  # t.decimal  "price_surge"
  # t.decimal  "revenue"
  # t.decimal  "revenue_base"
  # t.decimal  "revenue_surge"
  # t.text     "my_timestamp"
  # t.datetime "created_at",    null: false
  # t.datetime "updated_at",    null: false

  def create

    product_id = params[:product_id]
    product = Product.find(product_id)

    # Put your surge algorithim here

    surge_algorithim = 10

    product_price_old = product.price
    product_price_new = product.price + surge_algorithim

    revenue_total_new = product.revenue + product_price_old
    revenue_surge_new = product.revenue_surge + surge_algorithim
    revenue_base_new = product.revenue_base + product.price_base

    # Create order with old price (the price they bough) and new everything els

    order = Order.create(
        :product_id => product_id,
        :price => product_price_old,
        :price_base => product.price_base,
        :price_surge => product_price_old - product.price_base,
        :revenue => revenue_total_new,
        :revenue_surge => revenue_surge_new,
        :revenue_base => revenue_base_new
    )

    # Update the the latest order details in the product details as well

    product.update(
        :price => product_price_new,
        :revenue => revenue_total_new,
        :revenue_surge => revenue_surge_new,
        :revenue_base => revenue_base_new
    )

    redirect_to "/products/#{product_id}"
  end

  def show
  end



  def api_orders
      params[:id]
      render json: Order.where(:product_id => params[:id])
  end

  private

end
