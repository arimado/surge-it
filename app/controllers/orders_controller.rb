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

    product_price_old = product.price
    product_price_new = product.price + 10

    order = Order.create(
        :product_id => product_id,
        :price => product_price_old,
        :price_base => product.price_base,
        :price_surge => product_price_old - product.price_base
    )

    product.update(
        :price => product_price_new
    )

    binding.pry
  end

  def show
  end

  private

end
