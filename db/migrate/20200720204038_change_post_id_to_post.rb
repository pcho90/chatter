class ChangePostIdToPost < ActiveRecord::Migration[6.0]
  def change
    rename_column :post_hashtags, :post_id_id, :post_id
    rename_column :post_hashtags, :hashtag_id_id, :hashtag_id
  end
end
