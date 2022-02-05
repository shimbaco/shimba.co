# frozen_string_literal: true

class UpdatePostService
  attr_accessor :post

  def initialize(form:)
    @form = form
  end

  def call
    @form.post.attributes = {
      slug: @form.slug,
      title: @form.title,
      body: @form.body,
      published_at: @form.published_at
    }

    @form.post.save!

    self.post = @form.post

    self
  end
end
