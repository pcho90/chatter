class CreateJoinCommentToComments < ActiveRecord::Migration[6.0]
  def change
    create_table :join_comment_to_comments do |t|

      t.timestamps
    end
  end
end
