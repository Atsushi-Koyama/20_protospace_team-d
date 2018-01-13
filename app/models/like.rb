class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :prototype
  validates_uniqueness_of :prototype_id, scope: :user_id
end
