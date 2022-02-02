# frozen_string_literal: true

module Admin::Posts
  class NewController < ActionController::Base
    include Authenticatable

    layout "admin"

    def call
      authenticate_user!

      @post_form = PostForm.new
    end
  end
end
