class RemoveRepostFromPost < ActiveRecord::Migration[6.0]
  def change
    remove_column :posts, :repost
  end
end
