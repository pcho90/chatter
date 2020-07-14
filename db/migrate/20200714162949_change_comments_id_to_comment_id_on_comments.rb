class ChangeCommentsIdToCommentIdOnComments < ActiveRecord::Migration[6.0]
  def change
    rename_column :comments, :comments_id, :comment_id
  end
end
