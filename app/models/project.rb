# frozen_string_literal: true

class Project
  attr_accessor :term, :name, :url, :description

  def initialize(term:, name:, description:, url: nil)
    @term = term
    @name = name
    @description = description
    @url = url
  end

  def self.all
    [
      new(
        term: "2014年3月〜現在",
        name: "Annict",
        url: "https://annict.com",
        description: "見たアニメが記録できるWebサービス"
      ),
      new(
        term: "2011年12月〜2015年ごろ",
        name: "Anoside",
        description: "匿名つぶやきサービス"
      )
    ]
  end
end
