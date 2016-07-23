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

    # products = Product.all
    # products.each do | p |
    #     puts p.id
    #
    #     product         = Product.find(p.id)
    #     reduce_factor   = 5
    #     reduced_price   = nil
    #
    #     puts 'base_price: '
    #     puts product.price_base
    #     puts 'before price: '
    #     puts product.price;
    #     puts '----------------'
    #
    #     if (Time.now - product.created_at > 20) then
    #         if (product.price >= product.price_base + reduce_factor) then
    #             product.update( {:price => product.price - reduce_factor} );
    #
    #
    #             product_id: "27",
    #             price: #<BigDecimal:7fd2ad4f7450,'0.23E3',9(18)>,
    #             price_base: #<BigDecimal:7fd2b01e07c8,'0.2E3',9(18)>,
    #             price_surge: #<BigDecimal:7fd2b01d3140,'0.3E2',9(18)>,
    #             revenue: #<BigDecimal:7fd2ad8eec48,'0.86E3',9(18)>,
    #             revenue_base: #<BigDecimal:7fd2b01c9c58,'0.8E3',9(18)>,
    #             revenue_surge: #<BigDecimal:7fd2b01c02c0,'0.4E2',9(18)>,
    #             my_timestamp: nil,
    #             created_at: Sat, 23 Jul 2016 06:30:18 UTC +00:00,
    #             updated_at: Sat, 23 Jul 2016 06:30:18 UTC +00:00>
    #
    #             Order.create(
    #                 :product_id => product_id,
    #                 :price => product_price_old,
    #                 :price_base => product.price_base,
    #                 :price_surge => product_price_old - product.price_base,
    #                 :revenue => revenue_total_new,
    #                 :revenue_surge => revenue_surge_new,
    #                 :revenue_base => revenue_base_new,
    #
    #             )
    #
    #
    #         end
    #     end
    #
    #     puts 'after price: '
    #     puts product.price;
    #     puts '----------------'
    #
    # end

    # Rails.logger.info "hello, it's #{Time.now} ---------------"
    # Rails.logger.flush
end
