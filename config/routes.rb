# frozen_string_literal: true

Rails.application.routes.draw do
  # rubocop:disable Layout/ExtraSpacing
  match "/admin",                     via: :get,    as: :admin,           to: "admin/home/show#call"
  match "/admin/posts",               via: :post,   as: :admin_post_list, to: "admin/posts/create#call"
  match "/admin/posts/:post_id",      via: :patch,  as: :admin_post,      to: "admin/posts/update#call"
  match "/admin/posts/:post_id/edit", via: :get,    as: :admin_edit_post, to: "admin/posts/edit#call"
  match "/admin/posts/new",           via: :get,    as: :admin_new_post,  to: "admin/posts/new#call"

  match "/auth/auth0",                via: :delete, as: :auth0,           to: "auth/auth0/sessions/destroy#call"
  match "/auth/auth0/callback",       via: :get,    as: :auth0_callback,  to: "auth/auth0/callback/show#call"
  # rubocop:enable Layout/ExtraSpacing

  root "welcome/show#call"
end
