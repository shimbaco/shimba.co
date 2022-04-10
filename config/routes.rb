# frozen_string_literal: true

Rails.application.routes.draw do
  # rubocop:disable Layout/ExtraSpacing
  match "/admin",                     via: :get,    as: :admin,           to: "admin/home/show#call"
  match "/admin/posts",               via: :post,   as: :admin_post_list, to: "admin/posts/create#call"
  match "/admin/posts/:post_id",      via: :delete, as: :admin_post,      to: "admin/posts/destroy#call"
  match "/admin/posts/:post_id",      via: :patch,                        to: "admin/posts/update#call"
  match "/admin/posts/:post_id/edit", via: :get,    as: :admin_edit_post, to: "admin/posts/edit#call"
  match "/admin/posts/new",           via: :get,    as: :admin_new_post,  to: "admin/posts/new#call"
  match "/auth/auth0",                via: :delete, as: :auth0,           to: "auth/auth0/sessions/destroy#call"
  match "/auth/auth0/callback",       via: :get,    as: :auth0_callback,  to: "auth/auth0/callback/show#call"
  match "/feed",                      via: :get,    as: :feed,            to: "feeds/show#call"
  match "/projects",                  via: :get,    as: :project_list,    to: "projects/index#call"
  match "/:post_slug",                via: :get,    as: :post,            to: "posts/show#call", post_slug: /[A-Za-z0-9-]+/
  # rubocop:enable Layout/ExtraSpacing

  root "welcome/show#call"
end
