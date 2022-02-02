# frozen_string_literal: true

module Auth::Auth0::Callback
  class ShowController < ApplicationController
    include Authenticatable

    def call
      auth_info = request.env["omniauth.auth"]
      sign_in(auth_info)

      redirect_to admin_path
    end
  end
end
