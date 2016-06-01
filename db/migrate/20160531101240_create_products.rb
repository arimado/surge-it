class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
        t.text      :name
        t.decimal   :price
        t.decimal   :price_base
        t.decimal   :price_max
        t.text      :description
        t.text      :image
        t.timestamps null: false
    end
  end
end
