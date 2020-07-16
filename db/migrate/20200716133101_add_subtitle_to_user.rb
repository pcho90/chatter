class AddSubtitleToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :subtitle, :string
  end
end
