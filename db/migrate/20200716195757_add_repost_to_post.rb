class AddRepostToPost < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :repost, :boolean
  end
end
