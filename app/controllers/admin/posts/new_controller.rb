# frozen_string_literal: true

module Admin::Posts
  class NewController < ApplicationController
    include Authenticatable

    layout "admin"

    before_action :authenticate_shimbaco!

    def call
      @post_form = PostForm.new
    end
  end
end
