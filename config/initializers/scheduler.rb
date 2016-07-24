#
# config/initializers/scheduler.rb

require 'rufus-scheduler'

# Let's use the rufus-scheduler singleton
#
s = Rufus::Scheduler.singleton


# Stupid recurrent task...
#
s.every '1s' do
    # Reduce all product prices by a thing

    products = Product.all
    products.each do | p |
        puts p.id

        product         = Product.find(p.id)
        reduce_factor   = 5
        reduced_price   = nil
        order           = Order.where(product_id: p.id).last  # get the last order made for that product

        # puts 'base_price: '
        # puts product.price_base
        # puts 'before price: '
        # puts product.price;
        # puts '----------------'


        if (Order.where(product_id: p.id).length > 0) then
            if (Time.now - order.created_at > 20) then
                if (product.price >= product.price_base + reduce_factor) then

                    product.update( {:price => product.price - reduce_factor} );
                    # Create an order with the updated product.price/surge_price, but an unchanged revenue

                    new_order = Order.create(
                        :product_id => product.id,
                        :price => product.price,
                        :price_base => product.price_base,
                        :price_surge => product.price - product.price_base,
                        :revenue => product.revenue,
                        :revenue_surge => product.revenue_surge,
                        :revenue_base => product.revenue_base,
                        :system_order => true
                    )

                    # puts 'system_order created: '
                    # puts new_order

                end
            end
        end

        # puts 'after price: '
        # puts product.price;
        # puts '----------------'

    end

    # Rails.logger.info "hello, it's #{Time.now} ---------------"
    # Rails.logger.flush
end
