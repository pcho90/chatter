class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :reposts, dependent: :destroy
  has_many :post_hashtags
  has_many :hashtags, through: :post_hashtags

  validates :username, presence: true
  validates :content, presence: true
end
