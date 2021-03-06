class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, UserImageUploader

  has_many :prototypes, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :like_prototypes, through: :likes, source: :prototype
  has_many :comments

  validates :name, presence: true
end
