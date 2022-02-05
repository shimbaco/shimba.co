# frozen_string_literal: true

module Admin::Posts
  class EditController < ApplicationController
    include Authenticatable

    layout "admin"

    def call
      authenticate_user!

      post = Post.find(params[:post_id])
      @post_form = PostForm.new(
        post: post,
        slug: post.slug,
        title: post.title,
        body: post.body,
        published_at: post.published_at
      )
    end
  end
end
