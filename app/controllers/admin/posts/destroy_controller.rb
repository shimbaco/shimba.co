# frozen_string_literal: true

module Admin::Posts
  class DestroyController < ApplicationController
    include Authenticatable

    before_action :authenticate_shimbaco!

    def call
      post = Post.find(params[:post_id])

      post.destroy!

      redirect_to(admin_path, notice: "Deleted")
    end
  end
end
