# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  included do
    helper_method :current_user, :shimbaco_signed_in?, :user_signed_in?
  end

  def sign_in(auth_info)
    raw_info = auth_info.dig("extra", "raw_info")
    session[:user_info] = raw_info
  end

  def current_user
    @current_user ||= begin
      return unless session[:user_info]

      User.new(email: session[:user_info]["email"])
    end
  end

  def sign_out
    reset_session
  end

  def user_signed_in?
    current_user.present?
  end

  def shimbaco_signed_in?
    user_signed_in? && current_user.shimbaco?
  end

  def authenticate_shimbaco!
    return if shimbaco_signed_in?

    redirect_to admin_path
  end
end
