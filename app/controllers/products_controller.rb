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
        product_params

        # Product.create needs to be explicitly specified because price_base
        # needs to be equal to the initial price

        product = Product.create(
            :name => product_params[:name],
            :description => product_params[:description],
            :image => product_params[:image],
            :price => product_params[:price],
            :price_base => product_params[:price],
            :price_max => product_params[:price_max]
        )

        redirect_to "/products/#{product.id}/details"

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
            params.require(:product).permit(:name, :price, :price_max, :description, :image);
        end
end
