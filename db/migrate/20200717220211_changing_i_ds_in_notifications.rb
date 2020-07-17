class ChangingIDsInNotifications < ActiveRecord::Migration[6.0]
  def change
    rename_column :notifications, :sender, :sender_id
    rename_column :notifications, :receiver, :receiver_id
  end
end
