# frozen_string_literal: true

module Welcome
  class ShowController < ApplicationController
    layout "application"

    def call
      @posts = Post.published.order(published_at: :desc)
    end
  end
end
