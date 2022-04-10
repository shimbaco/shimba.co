# frozen_string_literal: true

module Feeds
  class ShowController < ApplicationController
    layout false

    def call
      @posts = Post.published.order(published_at: :desc).first(20)
      @author_name = "Shimba, Koji (@shimbaco)"

      render formats: :atom
    end
  end
end
