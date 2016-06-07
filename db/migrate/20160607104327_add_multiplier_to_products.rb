class AddMultiplierToProducts < ActiveRecord::Migration
  def change
      add_column :products, :surge_multiplier, :decimal
  end
end
