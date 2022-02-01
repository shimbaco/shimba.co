# frozen_string_literal: true

module Shimbaco::Form
  extend ActiveSupport::Concern

  included do
    include ActiveModel::Model

    # @overload
    def self.i18n_scope
      :form
    end
  end
end
