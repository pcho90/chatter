class AddReplyToToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :reply_to, :string
  end
end
