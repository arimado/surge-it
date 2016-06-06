class AddDefaultsToProducts < ActiveRecord::Migration
    def change
        change_column :products, :price , :decimal, :default => 0
        change_column :products, :price_base, :decimal, :default => 0
        change_column :products, :price_max, :decimal, :default => 0
        change_column :products, :revenue, :decimal, :default => 0
        change_column :products, :revenue_base, :decimal, :default => 0
        change_column :products, :revenue_surge, :decimal, :default => 0
    end
end
