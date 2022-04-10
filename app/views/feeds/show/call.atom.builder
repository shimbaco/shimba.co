atom_feed(language: "ja-JP") do |feed|
  feed.title("shimba.co")
  feed.updated(@posts.first.published_at)

  feed.author do |author|
    author.name(@author_name)
  end

  @posts.each do |post|
    feed.entry(post, url: post_url(post.slug), published: post.published_at, updated: post.updated_at) do |entry|
      entry.title(post.title)
      entry.content(render_markdown(post.body), type: "html")

      entry.author do |author|
        author.name(@author_name)
      end
    end
  end
end
