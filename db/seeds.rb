
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
# t.decimal   :price
# t.decimal   :price_base
# t.decimal   :price_max
# t.text      :description
# t.text      :image

Product.destroy_all

p1  = Product.create(
    :name => 'Light Saber Blue',
    :description => 'You can kill people with this',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :price => 115.25,
    :price_base => 80,
    :price_max => 200
)

p2  = Product.create(
    :name => 'Light Saber Red',
    :description => 'You can kill people with this',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :price => 115.25,
    :price_base => 80,
    :price_max => 200
)

p3  = Product.create(
    :name => 'Car',
    :description => 'It drives around and stuff',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :price => 21000.00,
    :price_base => 19999.95,
    :price_max => 25000.00
)


# ASSOCIATIONS

u1.products << p1 << p2
u2.products << p3

# ***********  ORDERS ***************** #


# t.text    "product_id"
# t.decimal "price"
# t.decimal "price_base"
# t.decimal "price_surge"
# t.decimal "revenue"
# t.decimal "revenue_base"
# t.decimal "revenue_surge"

Order.destroy_all

o1 = Order.create(
    :price => p1.price
)

p1.orders << o1
