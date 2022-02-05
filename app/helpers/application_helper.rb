# frozen_string_literal: true

module ApplicationHelper
  def display_time(time)
    time&.in_time_zone("Asia/Tokyo")&.to_formatted_s(:ymdhm)
  end
end
