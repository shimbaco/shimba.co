# frozen_string_literal: true

module Admin::Posts
  class EditController < ApplicationController
    include Authenticatable

    layout "admin"

    before_action :authenticate_shimbaco!

    def call
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
