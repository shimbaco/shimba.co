# frozen_string_literal: true

module Admin::Posts
  class CreateController < ActionController::Base
    include Authenticatable

    layout "admin"

    def call
      authenticate_user!

      @post_form = PostForm.new(post_form_params)

      if @post_form.invalid?
        return render("/admin/posts/new/call", status: :unprocessable_entity)
      end

      ActiveRecord::Base.transaction do
        CreatePostService.new(form: @post_form).call
      end

      redirect_to(admin_path, notice: "Created")
    end

    private

    def post_form_params
      params.require(:post_form).permit(:slug, :title, :body, :published_at)
    end
  end
end
