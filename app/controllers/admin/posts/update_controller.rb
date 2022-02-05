# frozen_string_literal: true

module Admin::Posts
  class UpdateController < ApplicationController
    include Authenticatable

    layout "admin"

    before_action :authenticate_shimbaco!

    def call
      @post_form = PostForm.new(post_form_params)
      @post_form.post = Post.find(params[:post_id])

      if @post_form.invalid?
        return render("/admin/posts/edit/call", status: :unprocessable_entity)
      end

      ActiveRecord::Base.transaction do
        UpdatePostService.new(form: @post_form).call
      end

      redirect_to(admin_path, notice: "Updated")
    end

    private

    def post_form_params
      params.require(:post_form).permit(:slug, :title, :body, :published_at)
    end
  end
end
