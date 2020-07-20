class PostHashtag < ApplicationRecord
  belongs_to :post, foreign_key: "post_id"
  belongs_to :hashtag, foreign_key: "hashtag_id"
end
