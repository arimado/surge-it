class OrdersController < ApplicationController
  def new
  end

  def index
  end

  def create
      order = Order.create order_params
  end

  def show
  end

  private
      def order_params
        params.require(:order).permit(:product_id, :price, :price_base, :price_surge, :revenue, :revenue_base, :revenue_surge)
      end
end
