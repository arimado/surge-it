class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
        t.text      :product_id
        t.decimal   :price
        t.decimal   :price_base
        t.decimal   :price_surge
        t.decimal   :revenue
        t.decimal   :revenue_base
        t.decimal   :revenue_surge
    end
  end
end
