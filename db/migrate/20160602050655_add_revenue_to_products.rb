class AddRevenueToProducts < ActiveRecord::Migration
    def change
        add_column :products, :revenue, :decimal
        add_column :products, :revenue_base, :decimal
        add_column :products, :revenue_surge, :decimal
    end
end
