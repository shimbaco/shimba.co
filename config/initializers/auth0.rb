# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    ENV.fetch("SHIMBACO_AUTH0_CLIENT_ID"),
    ENV.fetch("SHIMBACO_AUTH0_CLIENT_SECRET"),
    ENV.fetch("SHIMBACO_AUTH0_DOMAIN"),
    callback_path: '/auth/auth0/callback',
    authorize_params: {
      scope: 'openid email'
    }
  )
end
