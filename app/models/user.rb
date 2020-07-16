class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_many :likes
  has_many :follows
  has_many :follower_ref, class_name: "Follow", foreign_key: "following_id"
  has_many :followers, through: :follower_ref, source: :follower
  has_many :following_ref, class_name: "Follow", foreign_key: "follower_id"
  has_many :following, through: :following_ref, source: :following

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
end
