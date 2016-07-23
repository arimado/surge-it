class AddSystemOrderToProducts < ActiveRecord::Migration
  def change
      add_column :products, :system_order, :boolean
  end
end
