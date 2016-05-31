class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
        t.text      :name
        t.integer   :price
        t.text      :description
        t.text      :image
    end
  end
end
