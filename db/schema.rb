# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160723062033) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "orders", force: :cascade do |t|
    t.text     "product_id"
    t.decimal  "price"
    t.decimal  "price_base"
    t.decimal  "price_surge"
    t.decimal  "revenue"
    t.decimal  "revenue_base"
    t.decimal  "revenue_surge"
    t.text     "my_timestamp"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "products", force: :cascade do |t|
    t.text     "name"
    t.decimal  "price",            default: 0.0
    t.decimal  "price_base",       default: 0.0
    t.decimal  "price_max",        default: 0.0
    t.text     "description"
    t.text     "image"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id"
    t.decimal  "revenue",          default: 0.0
    t.decimal  "revenue_base",     default: 0.0
    t.decimal  "revenue_surge",    default: 0.0
    t.integer  "trend"
    t.decimal  "surge_multiplier"
    t.boolean  "system_order"
  end

  create_table "users", force: :cascade do |t|
    t.text     "name"
    t.text     "email"
    t.text     "password_digest"
    t.text     "image"
    t.boolean  "admin",           default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

end
