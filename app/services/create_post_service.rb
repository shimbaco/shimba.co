# frozen_string_literal: true

class CreatePostService
  attr_accessor :post

  def initialize(form:)
    @form = form
  end

  def call
    post = Post.new(
      slug: @form.slug,
      title: @form.title,
      body: @form.body,
      published_at: @form.published_at
    )

    post.save!

    self.post = post

    self
  end
end
