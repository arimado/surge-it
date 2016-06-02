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
     product.update :price => product.price + 10

    # => ADD TO ORDERS DB
    # => UPDATE current product
    # =>    increment by 10

     binding.pry
  end

  def show
  end

  private

end
