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
    products = Product.last
    Rails.logger.info "hello, it's #{Time.now} ---------------"
    Rails.logger.info "this is something #{products} ---------------"
    Rails.logger.flush
end
