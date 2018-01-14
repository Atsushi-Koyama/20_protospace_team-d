class Like < ActiveRecord::Base
  belongs_to :user
  belongs_to :prototype, counter_cache: :likes_count
  validates_uniqueness_of :prototype_id, scope: :user_id

end
