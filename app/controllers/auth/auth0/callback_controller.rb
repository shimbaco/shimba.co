# frozen_string_literal: true

class Auth::Auth0::CallbackController < ActionController::Base
  include Authenticatable

  def show
    auth_info = request.env["omniauth.auth"]
    sign_in(auth_info)

    redirect_to admin_path
  end
end
