class AddParentToComments < ActiveRecord::Migration[6.0]
  def change
    add_reference :comments, :comments, null: true, foreign_key: true
  end
end
