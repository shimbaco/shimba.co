# frozen_string_literal: true

Rails.application.routes.draw do
  # standard:disable Layout/ExtraSpacing, Layout/LineLength
  match "/admin",               via: :get,    as: :admin,           to: "admin/home/show#call"
  match "/admin/posts",         via: :post,   as: :admin_post_list, to: "admin/posts/create#call"
  match "/admin/posts/new",     via: :get,    as: :admin_new_post,  to: "admin/posts/new#call"

  match "/auth/auth0",          via: :delete, as: :auth0,           to: "auth/auth0/sessions/destroy#call"
  match "/auth/auth0/callback", via: :get,    as: :auth0_callback,  to: "auth/auth0/callback/show#call"
  # standard:enable Layout/ExtraSpacing, Layout/LineLength

  root "welcome/show#call"
end
