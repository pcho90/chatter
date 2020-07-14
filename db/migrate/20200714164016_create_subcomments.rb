class CreateSubcomments < ActiveRecord::Migration[6.0]
  def change
    create_table :subcomments do |t|

      t.timestamps
    end
  end
end
