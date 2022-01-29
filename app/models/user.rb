# frozen_string_literal: true

class User
  include ActiveModel::Model

  attr_accessor :email

  def shimbaco?
    email == "me@shimba.co"
  end
end
