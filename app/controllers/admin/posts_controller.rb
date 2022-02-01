# frozen_string_literal: true

class Admin::PostsController < ActionController::Base
  include Authenticatable

  layout "admin"

  def new
    authenticate_user!

    @post_form = PostForm.new
  end

  def create
    authenticate_user!

    @post_form = PostForm.new(post_form_params)

    if @post_form.invalid?
      return render(:new, status: :unprocessable_entity)
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
