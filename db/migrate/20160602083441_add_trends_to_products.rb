class AddTrendsToProducts < ActiveRecord::Migration
  def change
      add_column :products, :trend, :integer
  end
end
