class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_many :likes
  has_many :followers, class_name: "User", foreign_key: "follower_id"
  has_many :following, class_name: "User", foreign_key: "following_id"

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
end
