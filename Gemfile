source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.0"

gem "rails", "~> 7.0.0"

gem "bootsnap", require: false
gem "cssbundling-rails"
gem "jsbundling-rails"
gem "omniauth-auth0"
gem "omniauth-rails_csrf_protection"
gem "pg"
gem "propshaft"
gem "puma"
gem "view_component"

group :development, :test do
  gem "dotenv-rails"
  gem "pry-rails"
  gem "rubocop-rails", require: false
  gem "standard"
end

group :development do
  gem "web-console"
end
