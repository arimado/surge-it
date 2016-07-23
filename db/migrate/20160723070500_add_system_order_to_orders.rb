class AddSystemOrderToOrders < ActiveRecord::Migration
  def change
      add_column :orders, :system_order, :boolean
  end
end
