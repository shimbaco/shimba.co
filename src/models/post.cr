class Post
  getter slug : String
  getter title : String
  getter published_at : Time

  def initialize(@slug : String, @title : String, @content : String, published_at : String)
    @published_at = Time.parse_utc(published_at, "%F")
  end

  def self.build_by_file_name(file_name : String)
    slug = file_name.sub(".md", "")

    post = nil
    FrontMatter.open("./posts/#{file_name}", false) do |front_matter, content_io|
      attrs = YAML.parse(front_matter)
      post = Post.new(slug, attrs["title"].to_s, content_io.gets_to_end, attrs["published_at"].to_s)
    end

    post
  end

  def self.all
    file_names = Dir.entries("./posts").select(/\.md\z/)
    posts = file_names.map { |file_name| build_by_file_name(file_name) }.compact

    posts.sort { |a, b| b.published_at <=> a.published_at }
  end

  def content_html
    Cmark.gfm_to_html(@content)
  end

  def published_on
    published_at.to_s("%Y-%m-%d")
  end
end
