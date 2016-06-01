
# t.text    "name"
# t.integer "price"
# t.text    "description"
# t.text    "image"
# t.integer "user_id"


class ProductsController < ApplicationController


    def index

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

    end

    private
        def product_params
            params.require(:product).permit(:name, :price, :description, :image);
        end
end
