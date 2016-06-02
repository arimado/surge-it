
# t.text     :name
# t.text     :email
# t.text     :password
# t.text     :password_confirmation
# t.image    :image
# t.boolean  :admin :default => false,
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
    :price_max => 200,
    :revenue => 100,
    :revenue_base => 80,
    :revenue_surge => 20,
    :trend => 1
)

p2  = Product.create(
    :name => 'Light Saber Red',
    :description => 'You can kill people with this',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :price => 115.25,
    :price_base => 80,
    :price_max => 200,
    :revenue => 100,
    :revenue_base => 80,
    :revenue_surge => 20,
    :trend => 1
)

p3  = Product.create(
    :name => 'Car',
    :description => 'It drives around and stuff',
    :image => 'http://lovelace-media.imgix.net/uploads/259/da8e6e30-0a0e-0132-07c7-0eae5eefacd9.jpg?w=700&fit=max&auto=format&q=70',
    :price => 21000.00,
    :price_base => 19999.95,
    :price_max => 25000.00,
    :revenue => 100,
    :revenue_base => 80,
    :revenue_surge => 20,
    :trend => 1
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

# o17 = Order.create( :price => 120.00,
#                   :price_base => 100.00,
#                   :price_surge => 20.00,
#                   :revenue => 120.00,
#                   :revenue_base => 100.00,
#                   :revenue_surge => 20.00,
#                   :my_timestamp => '2016-6-1 07:00:00'
#                  )
# o1 = Order.create( :price => 123.00,
#                   :price_base => 100.00,
#                   :price_surge => 23.00,
#                   :revenue => 243.00,
#                   :revenue_base => 200.00,
#                   :revenue_surge => 43.00,
#                   :my_timestamp => '2016-6-1 07:00:00'
#                   )
# o2 = Order.create(:price => 126.00,
#                   :price_base => 100.00,
#                   :price_surge => 26.00,
#                   :revenue => 369.00,
#                   :revenue_base => 300.00,
#                   :revenue_surge => 69.00,
#                   :my_timestamp => '2016-6-1 07:00:00'
#                  )
# o3 = Order.create( :price => 129.00,
#                   :price_base => 100.00,
#                   :price_surge => 29.00,
#                   :revenue => 498.00,
#                   :revenue_base => 400.00,
#                   :revenue_surge => 98.00,
#                   :my_timestamp => '2016-6-1 07:30:00'
#                  )
# o4 = Order.create( :price => 132.00,
#                   :price_base => 100.00,
#                   :price_surge => 32.00,
#                   :revenue => 630.00,
#                   :revenue_base => 500.00,
#                   :revenue_surge => 130.00,
#                   :my_timestamp => '2016-6-1 07:30:00'
#               )
# o5 = Order.create( :price => 135.00,
#                   :price_base => 100.00,
#                   :price_surge => 35.00,
#                   :revenue => 765.00,
#                   :revenue_base => 600.00,
#                   :revenue_surge => 165.00,
#                   :my_timestamp => '2016-6-1 12:00:00'
#               )
# o6 = Order.create( :price => 138.00,
#                   :price_base => 100.00,
#                   :price_surge => 38.00,
#                   :revenue => 903.00,
#                   :revenue_base => 700.00,
#                   :revenue_surge => 203.00,
#                   :my_timestamp => '2016-6-1 13:00:00'
#               )
# o7 = Order.create( :price => 141.00,
#                   :price_base => 100.00,
#                   :price_surge => 41.00,
#                   :revenue => 1044.00,
#                   :revenue_base => 800.00,
#                   :revenue_surge => 244.00,
#                   :my_timestamp => '2016-6-1 14:00:00'
#               )
# o8 = Order.create( :price => 144.00,
#                   :price_base => 100.00,
#                   :price_surge => 44.00,
#                   :revenue => 1188.00,
#                   :revenue_base => 900.00,
#                   :revenue_surge => 288.00,
#                   :my_timestamp => '2016-6-1 15:00:00'
#               )
# o9 = Order.create( :price => 147.00,
#                   :price_base => 100.00,
#                   :price_surge => 47.00,
#                   :revenue => 1335.00,
#                   :revenue_base => 1000.00,
#                   :revenue_surge => 335.00,
#                   :my_timestamp => '2016-6-1 17:00:00'
#               )
# o10 = Order.create( :price => 150.00,
#                   :price_base => 100.00,
#                   :price_surge => 50.00,
#                   :revenue => 1485.00,
#                   :revenue_base => 1100.00,
#                   :revenue_surge => 385.00,
#                   :my_timestamp => '2016-6-1 17:10:00'
#               )
# o11 = Order.create( :price => 153.00,
#                   :price_base => 100.00,
#                   :price_surge => 53.00,
#                   :revenue => 1638.00,
#                   :revenue_base => 1200.00,
#                   :revenue_surge => 438.00,
#                   :my_timestamp => '2016-6-1 17:00:00'
#               )
# o12 = Order.create( :price => 156.00,
#                   :price_base => 100.00,
#                   :price_surge => 56.00,
#                   :revenue => 1794.00,
#                   :revenue_base => 1300.00,
#                   :revenue_surge => 494.00,
#                   :my_timestamp => '2016-6-1 23:10:00'
#               )
# o13 = Order.create( :price => 159.00,
#                   :price_base => 100.00,
#                   :price_surge => 59.00,
#                   :revenue => 1953.00,
#                   :revenue_base => 1400.00,
#                   :revenue_surge => 553.00,
#                   :my_timestamp => '2016-6-1 23:20:00'
#               )
# o14 = Order.create( :price => 162.00,
#                   :price_base => 100.00,
#                   :price_surge => 62.00,
#                   :revenue => 2115.00,
#                   :revenue_base => 1500.00,
#                   :revenue_surge => 615.00,
#                   :my_timestamp => '2016-6-1 23:30:00'
#               )
# o15 = Order.create( :price => 165.00,
#                   :price_base => 100.00,
#                   :price_surge => 65.00,
#                   :revenue => 2280.00,
#                   :revenue_base => 1600.00,
#                   :revenue_surge => 680.00,
#                   :my_timestamp => '2016-6-1 23:40:00'
#               )
# o16 = Order.create( :price => 168.00,
#                   :price_base => 100.00,
#                   :price_surge => 68.00,
#                   :revenue => 2448.00,
#                   :revenue_base => 1700.00,
#                   :revenue_surge => 748.00,
#                   :my_timestamp => '2016-6-1 23:50:00'
#               )

# p1.orders << o1
