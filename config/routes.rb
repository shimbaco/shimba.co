# frozen_string_literal: true

Rails.application.routes.draw do
  # standard:disable Layout/ExtraSpacing, Layout/LineLength
  match "/admin",               via: :get,    as: :admin,           to: "admin/home#show"
  match "/admin/posts",         via: :post,   as: :admin_post_list, to: "admin/posts#create"
  match "/admin/posts/new",     via: :get,    as: :admin_new_post,  to: "admin/posts#new"

  match "/auth/auth0",          via: :delete, as: :auth0,           to: "auth/auth0/sessions#destroy"
  match "/auth/auth0/callback", via: :get,    as: :auth0_callback,  to: "auth/auth0/callback#show"
  match "/auth/auth0/failure",  via: :get,    as: :auth0_failure,   to: "auth0#failure"
  # standard:enable Layout/ExtraSpacing, Layout/LineLength

  root "welcome#show"
end
