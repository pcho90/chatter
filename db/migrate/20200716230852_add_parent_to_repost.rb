class AddParentToRepost < ActiveRecord::Migration[6.0]
  def change
    add_column :reposts, :parent_id, :integer
  end
end
