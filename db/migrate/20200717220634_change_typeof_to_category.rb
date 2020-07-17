class ChangeTypeofToCategory < ActiveRecord::Migration[6.0]
  def change
    rename_column :notifications, :typeof, :category
  end
end
