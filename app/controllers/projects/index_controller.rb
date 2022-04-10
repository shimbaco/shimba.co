# frozen_string_literal: true

module Projects
  class IndexController < ApplicationController
    layout "application"

    def call
      @projects = Project.all
    end
  end
end
