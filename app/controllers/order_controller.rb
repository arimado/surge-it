class OrderController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
      order = Order.create params
  end
end
