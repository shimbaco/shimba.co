# frozen_string_literal: true

module Admin::Home
  class ShowController < ApplicationController
    include Authenticatable

    layout "admin"

    def call
      unless shimbaco_signed_in?
        return render("/admin/home/show/call_for_guest")
      end

      @posts = Post.order("published_at DESC NULLS FIRST")
    end
  end
end
