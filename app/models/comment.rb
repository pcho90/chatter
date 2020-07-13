class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :username, presence: true
  validates :content, presence: true
end
