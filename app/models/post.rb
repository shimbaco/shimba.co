# frozen_string_literal: true

class Post < ApplicationRecord
  scope :published, -> { where.not(published_at: nil) }
end
