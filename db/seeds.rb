
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

u2  = User.create(
    :name => 'Jake',
    :email => 'jake@gmail.com',
    :password => 'chicken',
    :password_confirmation => 'chicken',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :admin => true
)

# t.text      :name
# t.integer   :price
# t.text      :description
# t.text      :image

Product.destroy_all

p1  = Product.create(
    :name => 'Light Saber Blue',
    :description => 'You can kill people with this',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70'
)

p2  = Product.create(
    :name => 'Light Saber Red',
    :description => 'You can kill people with this',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70'
)

p3  = Product.create(
    :name => 'Car',
    :description => 'It drives around and stuff',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70'
)


# ASSOCIATIONS

u1.products << p1
