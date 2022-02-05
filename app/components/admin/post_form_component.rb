# frozen_string_literal: true

module Admin
  class PostFormComponent < ViewComponent::Base
    def initialize(post_form:)
      @post_form = post_form
    end

    def form_url
      @post_form.persisted? ? admin_post_path : admin_post_list_path
    end
  end
end
