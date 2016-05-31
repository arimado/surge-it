class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text     :name
      t.text     :email
      t.text     :password
      t.text     :password_confirmation
      t.text     :image
      t.boolean  :admin, :default => false
      t.timestamps null: false
    end
  end
end
