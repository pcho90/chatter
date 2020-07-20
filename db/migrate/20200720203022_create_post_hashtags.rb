class CreatePostHashtags < ActiveRecord::Migration[6.0]
  def change
    create_table :post_hashtags do |t|
      t.references :post_id, null: false
      t.references :hashtag_id, null: false

      t.timestamps
    end
  end
end
