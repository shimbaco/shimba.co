# frozen_string_literal: true

module Admin::Home
  class ShowController < ApplicationController
    include Authenticatable

    layout "admin"
  end
end
