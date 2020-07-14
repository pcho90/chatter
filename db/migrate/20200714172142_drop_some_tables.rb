class DropSomeTables < ActiveRecord::Migration[6.0]
  def change
    drop_table :join_comment_to_comments
    drop_table :subcomments
  end
end
