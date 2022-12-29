---
title: コーディング規約をまとめてみた (Rails編)
published_at: 2012-10-16T00:00:00.000Z
---

半年ほど前に書いた「[コーディング規約をまとめてみた (Ruby編)](http://bojovs.github.com/2012/04/24/ruby-coding-style/)」に引き続き、Railsのコーディング規約もまとめてみました。前回と同じように、できるだけ理由を併記するよう努めました (主観的なものも含まれていますが…)。

気に入らない規約や、この記事に書かれている規約以外にも気をつけていることなどありましたら、コメントなどで教えてもらえると嬉しいです (理由も合わせて書いてくれると助かります)。

Railsのコーディング規約は以下のページを参考にまとめています。

* [http://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#follow-the-coding-conventions](http://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#follow-the-coding-conventions)
* [https://github.com/bbatsov/rails-style-guide](https://github.com/bbatsov/rails-style-guide)


## 前提
コード例は「[コーディング規約をまとめてみた (Ruby編)](http://bojovs.github.com/2012/04/24/ruby-coding-style/)」をベースに記述します。


### Railsのバージョン

バージョン3.2系を対象にしています。


## ルーティング

RESTfulなリソース(`resources` メソッドを使用したルーティング)に対して新たにrouteを追加する場合は、`member` や `collection` を使用します。

```ruby
# 悪い例
get 'subscriptions/:id/unsubscribe'
resources :subscriptions

# 良い例
resources :subscriptions do
  get 'unsubscribe', on: :member
end

# 悪い例
get 'photos/search'
resources :photos

# 良い例
resources :photos do
  get 'search', on: :collection
end
```

**理由:**

* `resources` メソッドのブロック内に記述することで、追加するrouteがそのリソースに結びついているということが明確になるため。


`member` , `collection` ルーティングを複数定義する場合は、ブロック内に記述します。

```ruby
resources :subscriptions do
  member do
    post 'subscribe'
    post 'unsubscribe'
  end
end

resources :photos do
  collection do
    get 'explore'
    get 'search'
  end
end
```

**理由:**

* 重複部分がなくなり、見た目がすっきりするため。

**コメント:**

* [thoughtbotのプログラミングガイド](https://github.com/thoughtbot/guides/tree/master/style#rails)に、"Avoid member and collection routes." と書かれているのですが、これは何故なんでしょう…?


「Nested routes」は、各モデルの関係を表現するために使用します。

```ruby
class Post < ActiveRecord::Base
  has_many :comments
end

class Comments < ActiveRecord::Base
  belongs_to :post
end

# routes.rb
resources :posts do
  resources :comments
end
```


「Namespaced routes」は、関係するroutesをグルーピングするために使用します。

```ruby
namespace :admin do
  resources :products
end
```


「Legacy wild controller route」は使用してはいけません。

```ruby
# ダメ! ゼッタイ!
match ':controller(/:action(/:id(.:format)))'
```

**理由:**

* RESTfulでなくなるため。
  * コントローラ内の全てのアクションにGETメソッドでアクセスできてしまう。


## コントローラ

コントローラ内に複雑なビジネスロジックを記述してはいけません。
ビジネスロジックはモデルやヘルパーに記述し、コントローラ内はリクエストからレスポンスまでの一連の流れを簡潔に表現するようにします。

**理由:**

* そのアクションがどのようなことをするのかが理解しやすくなるため。
* ビジネスロジックのテストがやりやすくなるため。


## モデル

`has_many`, `validates` などのクラスメソッドは、モデル定義の最初の部分に記述します。

```ruby
# 悪い例 (クラスメソッドがメソッド宣言のあとに呼び出されている)
class User < ActiveRecord::Base
  def follow
  end

  has_and_belongs_to_many :groups
end

# 良い例 (クラスメソッドの呼び出しはモデル定義の最初の部分で行う)
class User < ActiveRecord::Base
  has_and_belongs_to_many :groups


  def follow
  end
end
```


各クラスメソッドは機能ごとに一定の順番で記述します。

```ruby
class User < ActiveRecord::Base
  # 1番目にアクセッサ関連のクラスメソッドを呼び出す
  attr_accessor :type
  attr_accessible :name, :type

  # 2番目にアソシエーション関連のクラスメソッドを呼び出す
  has_and_belongs_to_many :groups
  has_many :posts

  # 3番目にバリデーション関連のクラスメソッドを呼び出す
  validates :name, presence: true

  # 4番目にNamed scopeを呼び出す
  scope :deleted, where(deleted: true)

  # 5番目に外部ライブラリのクラスメソッドを呼び出す
  # 各外部ライブラリごとに1行空白行を挿入する
  devise :database_authenticatable, :rememberable, :trackable

  has_attached_file :avatar

  # 6番目に before_validation などの、ブロック内が複数行になりうるクラスメソッドを呼び出す
  before_validation do
  end


  # 7番目にクラスメソッドを定義する
  # クラスメソッドの呼び出しと定義の間には2行分の空白行を挿入する
  def self.find_by_full_name
  end

  # 8番目にインスタンスメソッドを定義する
  def full_name
  end
end
```


同じ名前のクラスメソッドは一つにまとめて呼び出します。そのとき、アルファベット順で呼び出します。

```ruby
# 悪い例1 (2つのhas_manyが一箇所で呼び出されていない)
class User < ActiveRecord::Base
  has_many :comments
  has_and_belongs_to_many :groups
  has_many :posts
end

# 良い例1 (2つのhas_manyが一箇所で呼び出されている)
class User < ActiveRecord::Base
  has_and_belongs_to_many :groups
  has_many :comments
  has_many :posts
end

# 悪い例2 (has_and_belongs_to_manyがhas_manyのあとで呼び出されている)
class User < ActiveRecord::Base
  has_many :comments
  has_many :posts
  has_and_belongs_to_many :groups
end

# 良い例2 (「has_」のあとはそれぞれ「m」と「a」なので、アルファベット順に並べると
# has_and_belongs_to_manyがhas_manyより前に来る)
class User < ActiveRecord::Base
  has_and_belongs_to_many :groups
  has_many :comments
  has_many :posts
end

# 悪い例3 (「:posts」が「:comments」の前で呼び出されている)
class User < ActiveRecord::Base
  has_and_belongs_to_many :groups
  has_many :posts
  has_many :comments
end

# 良い例3 (アルファベット順に並べると(ry )
class User < ActiveRecord::Base
  has_and_belongs_to_many :groups
  has_many :comments
  has_many :posts
end
```

**理由:**

* そのモデルにどのようなことができるのかが把握しやすくするため。
  * 書いてある場所が予測しやすくなる
* どこに書けば良いかという迷いを無くすため。
* 各クラスメソッドの機能ごとの呼び出しの順番は、GitHub上で一番Starが付けられているRailsアプリケーションである
  [Diaspora](https://github.com/diaspora/diaspora) のモデル定義を参考にしました。
  * アルファベット順に並べることで、全員が同じ場所でそのクラスメソッドを呼び出すようになると思います。


できるだけ `has_and_belongs_to_many` は使用せず、 `has_many :through` を使用します。

**理由:**

* 外部キー以外のフィールドも追加することができるため。
* 中間テーブル上でバリデーションの設定ができるため。


`validates_presence_of` などの古いバリデーションメソッドは使用せず、["sexy validations"](http://thelucid.com/2010/01/08/sexy-validation-in-edge-rails-rails-3/) を使用します。

```ruby
# 悪い例
class User < ActiveRecord::Base
  validates_presence_of :email, :name
end

# 良い例
class User < ActiveRecord::Base
  validates :email, presence: true
  validates :name, presence: true
end
```

**理由:**

* そのフィールドに付加するバリデーションの設定が1行で記述できるため。
  * 読む側も1行だけ見るだけでそのフィールドに設定されている全てのバリデーション内容が把握できます


独自のバリデーションを複数回呼び出すときや正規表現を使用するバリデーションを設定したいときは、独自のバリデーション用のクラスを定義します。

```ruby
# 悪い例
class Person
  validates :email, format: { with: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i }
end

# 良い例
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << (options[:message] || 'is not a valid email') unless value =~ /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  end
end

class Person
  validates :email, email: true
end
```

**理由:**

* そのバリデーションルールが何を意味しているのかがわかりやすくなるため。


独自のバリデーションはそのバリデーションのクラスごとにファイルを作成し、`app/validators` ディレクトリ以下に格納します。

```
app/validators
├── email_validator.rb
└── phone_number_validator.rb
```

**理由:**

* 特にありません。。
    * 皆さんどこに置いているのでしょうか?
    * [この辺り](http://stackoverflow.com/questions/5263239/where-should-rails-3-custom-validators-be-stored)を見ると、`lib` ディレクトリ以下に置くか `app` ディレクトリ以下に置くかで意見が分かれているようです。


データの検索を行う処理を実装するときは、クラスメソッドを定義せず、Named scopeを使用します。引数が必要な場合は、Ruby 1.9から導入されたlambdaメソッドの省略記法 `->` を使用します。

```ruby
# 悪い例1 (クラスメソッドを定義している)
def self.published
  where(published: true)
end

# 良い例1
scope :published, where(published: true)

# 悪い例2-1 (クラスメソッドを定義している)
def self.liked_by(person)
  joins(:likes).where(likes: { author_id: person.id })
end

# 悪い例2-2 (lambdaメソッドの省略記法を使用していない)
scope :liked_by, lambda { |person|
  joins(:likes).where(:likes => {:author_id => person.id})
}

# 良い例2 (省略記法を使用したほうがタイプ数も少なくすっきりしていて見やすい)
scope :liked_by, -> person {
  joins(:likes).where(likes: { author_id: person.id })
}
```

**理由:**

* データを検索する処理とデータを操作する処理の見分けが付きやすくなるため。
  * **データを検索する処理:** Named scopeで定義
  * **データを操作する処理:** クラスメソッドで定義

**コメント:**

**更新 (2012/10/16 20:32):** Rails 4.0から `lambda` メソッドを使用する記述方法が推奨されます ([Ruby on Rails 4.0 Release Notes - "Deprecate eager-evaluated scopes."](http://edgeguides.rubyonrails.org/4_0_release_notes.html#active-record))。
「良い例1」は、4.0以降では以下のように記述します。(@pinzolo さんありがとうございます! )

```ruby
# 良い例1-1 (Rails 4.0から)
scope :published, -> { where(published: true) }
```


モデル内に定義するメソッドは、データを操作するメソッドか、データそのものを返すようにします。それ以外の値を返すときは、ヘルパーやデコレータ ([ActiveDecorator](https://github.com/amatsuda/active_decorator) など) を使用します。

```ruby
class User < ActiveRecord::Base
  # 悪い例
  # データベースからの値にビューで表示する上で必要なものを付加したい場合は
  # デコレータに記述します
  def full_name
    first_name + last_name + 'さん'
  end

  # 良い例
  def full_name
    first_name + last_name
  end
end
```


## マイグレーション

マイグレーションの記述には、Rails 3.1から導入された `change` メソッドを使用します。

```ruby
# 悪い例
class CreateProducts < ActiveRecord::Migration
  def up
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end

  def down
    drop_table :products
  end
end

# 良い例
class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

**理由:**

* ロールバックするためのメソッド (`down`メソッド) を記述する必要がなくなるため


## ビュー


ビュー内にビジネスロジックを記述してはいけません。ヘルパーやモデルに記述するようにします。


## Assets

自作のライブラリは `lib/assets` ディレクトリ以下に配置します。

jQueryやUnderscore.jsなどの外部ライブラリは `vendor/assets` ディレクトリ以下に配置します。


## Action Mailer


メール本文内にサイトのURLを表示したいときは、`_path` メソッドではなく `_url` メソッドを使用します。

```ruby
# 悪い例
You can always find more info about this course
= link_to 'here', url_for(course_path(@course))

# 良い例
You can always find more info about this course
= link_to 'here', url_for(course_url(@course))
```

**理由:**

* `_url` メソッドはホスト名も返すため。
  * 開発環境とプロダクション環境の両方で同じコードが利用できる


**追記 (2012/10/16 22:03):**

各方面からいくつかコメントを頂きました。ありがとうございます!

[id: ntaoo](http://b.hatena.ne.jp/ntaoo/) さん:「rails guideには引数付きのscopeを定義するよりクラスメソッドにするほうがprefered wayだよと書いてあったような。」

確かに "[Ruby on Rails Guides の "13.2 Passing in arguments"](http://guides.rubyonrails.org/active_record_querying.html#passing-in-arguments)" の項に以下のように書いてありました…。知りませんでした…。

```
"Using a class method is the preferred way to accept arguments for scopes."
```

ただ、引数を要するかどうかを問わず、 `ActiveRecord::Relation` オブジェクトを返す処理は `scope` で、それ以外はクラスメソッドで定義する、というように区別したほうが、どのメソッドがクエリメソッドとしてchainableなのかが判別しやすいかも知れません。


[@deeeki](https://twitter.com/deeeki) さん:「クラスマクロ呼び出しでなぜその順番が妥当かという理由もあれば知りたいところ」

[Diaspora](https://github.com/diaspora/diaspora) が大体こんな順番で書いているということ以外、特に理由はありません。。
なぜDiasporaがこの順番で書いているのか。推測ですが、「よく定義するクラスメソッド順」で書いたのではないかと考えています。上のほうで定義されているクラスメソッドほどよく定義している気がします。
