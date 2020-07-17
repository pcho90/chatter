class DropParentFromRepost < ActiveRecord::Migration[6.0]
  def change
    remove_column :reposts, :parent_id
  end
end
