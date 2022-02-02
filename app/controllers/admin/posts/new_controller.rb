# frozen_string_literal: true

module Admin::Posts
  class NewController < ApplicationController
    include Authenticatable

    layout "admin"

    def call
      authenticate_user!

      @post_form = PostForm.new
    end
  end
end
