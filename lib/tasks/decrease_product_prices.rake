desc "Decrease all product prices"
task :decrease_product_prices => :environment do
  puts "Decreasing product prices"
  DecreaseProductPriceWorker.new.perform
  puts "done now."
end
