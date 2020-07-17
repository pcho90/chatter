class ChangeTypeToTypeof < ActiveRecord::Migration[6.0]
  def change
    rename_column :notifications, :type, :typeof
  end
end
