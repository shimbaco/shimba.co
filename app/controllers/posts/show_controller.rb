# frozen_string_literal: true

module Posts
  class ShowController < ApplicationController
    layout "application"

    def call
      @post = Post.published.find_by!(slug: params[:post_slug])
    end
  end
end
