class PostHashtag < ApplicationRecord
  belongs_to :post_id
  belongs_to :hashtag_id
end
