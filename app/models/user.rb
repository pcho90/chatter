class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :follower_ref, class_name: "Follow", foreign_key: "following_id", dependent: :destroy
  has_many :followers, through: :follower_ref, source: :follower, dependent: :destroy
  has_many :following_ref, class_name: "Follow", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :following_ref, source: :following, dependent: :destroy
  has_many :reposts, dependent: :destroy

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }
end
