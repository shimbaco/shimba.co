# frozen_string_literal: true

class PostForm
  include Shimbaco::Form

  attr_accessor :body
  attr_reader :published_at, :slug, :title

  validates :slug, presence: true, length: {maximum: 50}
  validates :title, presence: true, length: {maximum: 50}
  validates :body, length: {maximum: 1_048_596}
  validate :slug_uniqueness

  def slug=(value)
    @slug = value&.strip
  end

  def title=(value)
    @title = value&.strip
  end

  def published_at=(value)
    @published_at = value.presence
  end

  private

  def slug_uniqueness
    if Post.find_by(slug: slug)
      errors.add(:slug, :slug_uniqueness)
    end
  end
end
