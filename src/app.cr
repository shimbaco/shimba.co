require "front_matter"
require "kemal"
require "yaml"

require "./models/post"

macro render_view(name, layout = "default")
  {% if layout == false %}
    render "src/views/#{{{name}}}.ecr"
  {% else %}
    render "src/views/#{{{name}}}.ecr", "src/views/layouts/#{{{layout}}}.ecr"
  {% end %}
end

get "/" do
  posts = Post.all.first(5)

  render_view "home/show"
end

get "/posts" do
  posts = Post.all

  render_view "posts/index"
end

get "/feed" do |env|
  posts = Post.all

  env.response.content_type = "text/xml; charset=utf-8"
  render_view "feeds/show", layout: false
end

get "/projects" do
  render_view "projects/index"
end

get "/about" do |env|
  env.redirect "/", status_code: 301
end

get "/:slug" do |env|
  slug = env.params.url["slug"]

  unless /\A[0-9a-zA-Z-]+\z/.matches?(slug)
    env.response.status_code = 404
    next
  end

  post = nil
  begin
    file_name = "#{slug}.md"
    post = Post.build_by_file_name(file_name)

    unless post
      env.response.status_code = 404
      next
    end

    render_view "posts/show"
  rescue File::NotFoundError
    env.response.status_code = 404
  end
end

# From bojovs.com
[
  "2011/09/09/hello-world",
  "2011/09/30/vows-zombie",
  "2011/12/25/anoside",
  "2012/04/24/ruby-coding-style",
  "2012/10/13/hello-world",
  "2012/10/16/rails-coding-style",
  "2013/11/16/a-whole-new-hello-world",
  "2014/03/10/introducing-annict"
].each do |path|
  get "/#{path}" do |env|
    slug = path.split("/").join("-")
    # env.redirect("https://shimba.co/#{slug}", status_code: 301)
    env.redirect("http://shimbaco.test:3000/#{slug}", status_code: 301)
  end
end

Kemal.run
