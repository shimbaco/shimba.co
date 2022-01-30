# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    enable_extension(:citext) unless extension_enabled?("citext")

    create_table :posts do |t|
      t.citext :slug, null: false
      t.string :title, null: false
      t.text :body, default: "", null: false
      t.datetime :published_at
      t.timestamps
    end
    add_index :posts, :slug, unique: true
    add_index :posts, :published_at
  end
end
