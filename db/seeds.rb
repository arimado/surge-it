
# t.text     :name
# t.text     :email
# t.text     :password
# t.text     :password_confirmation
# t.image    :image
# t.boolean  :admin, :default => false
# t.timestamps null: false

User.destroy_all # no duplicates!

u1  = User.create(
    :name => 'Jeremy Arimado',
    :email => 'jarimado@gmail.com',
    :password => 'chicken',
    :password_confirmation => 'chicken',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :admin => true
)
