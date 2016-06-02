class ProductsController < ApplicationController



    def index
        @order = Order.all

        # Just get all order data
        # parse created_at stuff into things that charts can read

    end

    def new
        @product = Product.new

    end

    def create
        product = Product.new product_params
    end

    def edit

    end

    def show
        @product = Product.find(params[:id])
        @order = Order.new
    end

    def details
        @product = Product.find(params[:id]);
    end

    def api_product
        render json: Product.find(params[:id])
    end

    private
        def product_params
            params.require(:product).permit(:name, :price, :description, :image);
        end
end
