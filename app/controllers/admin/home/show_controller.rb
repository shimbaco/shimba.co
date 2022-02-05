# frozen_string_literal: true

module Admin::Home
  class ShowController < ApplicationController
    include Authenticatable

    layout "admin"

    def call
      if shimbaco_signed_in?
        @posts = Post.order("published_at DESC NULLS FIRST")

        return render("/admin/home/show/call_for_shimbaco")
      end
    end
  end
end
