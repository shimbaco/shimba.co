# frozen_string_literal: true

class PostForm < ApplicationForm
  attr_accessor :body, :post
  attr_reader :published_at, :slug, :title

  validates :slug, presence: true, length: {maximum: 50}
  validates :title, presence: true, length: {maximum: 50}
  validates :body, length: {maximum: 1_048_596}
  validate :slug_uniqueness, if: -> { !persisted? }

  def slug=(value)
    @slug = value&.strip
  end

  def title=(value)
    @title = value&.strip
  end

  def published_at=(value)
    Time.use_zone("Asia/Tokyo") do
      @published_at = value&.in_time_zone.presence
    end
  end

  # @overload
  def persisted?
    !post.nil?
  end

  private

  def slug_uniqueness
    if Post.find_by(slug: slug)
      errors.add(:slug, :slug_uniqueness)
    end
  end
end
