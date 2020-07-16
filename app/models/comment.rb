class Comment < ApplicationRecord
  belongs_to :post, optional: true
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :reposts

  has_many :subcomments, class_name: "Comment", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Comment", optional: true

  validates :username, presence: true
  validates :content, presence: true
end
