class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.integer :refers
      t.integer :sender
      t.integer :receiver
      t.string :type

      t.timestamps
    end
  end
end
