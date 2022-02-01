# frozen_string_literal: true

class Auth::Auth0::SessionsController < ActionController::Base
  include Authenticatable

  def destroy
    sign_out

    redirect_to(logout_url, allow_other_host: true)
  end

  private

  def logout_url
    request_params = {
      returnTo: admin_url,
      client_id: ENV.fetch("SHIMBACO_AUTH0_CLIENT_ID")
    }

    URI::HTTPS.build(host: ENV.fetch("SHIMBACO_AUTH0_DOMAIN"), path: '/v2/logout', query: request_params.to_query).to_s
  end
end
