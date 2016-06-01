class Order < ActiveRecord::Base
    attr_accessible :created_at
    belongs_to :product
end
