#
# config/initializers/scheduler.rb

require 'rufus-scheduler'

# Let's use the rufus-scheduler singleton
#
s = Rufus::Scheduler.singleton


# Stupid recurrent task...
#
s.every '5s' do
    # Reduce all product prices by a thing
    products = Product.all

    products.each do | p |
        puts p.id

        product         = Product.find(p.id)
        reduce_factor   = 5
        reduced_price   = nil

        puts 'base_price: '
        puts product.price_base
        puts 'before price: '
        puts product.price;
        puts '----------------'
        
        if (product.price >= product.price_base + reduce_factor) then
            product.update( {:price => product.price - reduce_factor} );
        end

        puts 'after price: '
        puts product.price;
        puts '----------------'

    end

    Rails.logger.info "hello, it's #{Time.now} ---------------"
    Rails.logger.info "this is something #{products} ---------------"
    Rails.logger.flush
end
