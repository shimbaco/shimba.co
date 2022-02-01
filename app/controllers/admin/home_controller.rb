# frozen_string_literal: true

class Admin::HomeController < ActionController::Base
  include Authenticatable

  layout "application"
end
