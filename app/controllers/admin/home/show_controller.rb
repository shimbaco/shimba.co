# frozen_string_literal: true

module Admin::Home
  class ShowController < ActionController::Base
    include Authenticatable

    layout "admin"
  end
end
