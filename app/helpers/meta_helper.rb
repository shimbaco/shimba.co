# frozen_string_literal: true

module MetaHelper
  def wrapped_display_meta_tags
    display_meta_tags(
      reverse: true,
      site: "shimba.co",
      separator: " |",
      description: "Shimba, Koji (@shimbaco) のブログ記事やプロジェクトを掲載しています。"
    )
  end
end
