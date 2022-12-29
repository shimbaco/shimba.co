---
title: コーディング規約をまとめてみた (Ruby編)
published_at: 2012-04-24T00:00:00.000Z
---

色々なところで見かけるコーディング規約を見て意識はしているのですが、
その時の気分で書き方を変えてしまうことが多々あったので、自戒を込めてコーディング規約をまとめてみました。

「なぜこの規約が存在するか」を明確にするために、できる限り理由も併記しています。
ただかなり主観的な部分があるので、あまり意味がないかもしれません…。

「この記事のこの規約は気に入らない。」と思うことがきっとあると思います。
その時はコメント欄などに理由も合わせて書いてくれると嬉しいです。

この記事ではRubyのコーディング規約をまとめています。
近いうちにRailsとCoffeeScriptのコーディング規約もまとめるつもりです。

Rubyのコーディング規約は以下のページを参考にまとめました。

* [https://github.com/styleguide/ruby](https://github.com/styleguide/ruby)
* [https://github.com/bbatsov/ruby-style-guide](https://github.com/bbatsov/ruby-style-guide)
* [http://www.loveruby.net/w/RubyCodingStyle.html](http://www.loveruby.net/w/RubyCodingStyle.html)
* [http://shugo.net/ruby-codeconv/codeconv.html](http://shugo.net/ruby-codeconv/codeconv.html)

ちなみに、Railsのコーディング規約は以下のページを参考にまとめるつもりです。

* [http://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#follow-the-coding-conventions](http://guides.rubyonrails.org/contributing_to_ruby_on_rails.html#follow-the-coding-conventions)
* [https://github.com/bbatsov/rails-style-guide](https://github.com/bbatsov/rails-style-guide)

この記事はまだ書き終わっておらず、「あとで書く。」などとなっているところがいくつかあります。
これらは近いうちに追記します。


## 前提

明確な理由がない限り、できるだけ多くのRubyistが採用している書き方でコードを記述します。

**理由:**

* 他人の書き方に合わせることで、他人のコードが読みやすくなり、自分のコードも読まれやすくなるため。


## ソースコードレイアウト

インデントにはスペースを使用し、幅は2とします。

**理由:**

* Ruby界隈ではみんなそうしているため
  * 自動生成されたファイルがスペース/インデント幅2であることが多い
  * タブでインデントしていると、それらをその都度タブに置き換える必要がある
* GitHubが、タブをインデント幅8としてソースコード表示しているため
  * GitHub上でソースコードを見るとき、インデントが深すぎて見づらい


ファイルのエンコーディングは `UTF-8` とします。
一行の桁数は80桁までとします。

**理由:**

* 1行にまとめて記述するよりも、複数行に分割して記述したほうが、段階が追いやすく読みやすいため
* 1行が長すぎると横にスクロールする必要が出てくるため、読みづらくなる
  * 画面分割などで表示される領域が狭いことがある


## シンタックス

以下の部分にスペースを記述します。

* 演算子の前後
  * べき乗の演算子を除く
* カンマ、コロン、セミコロンの後ろ
* 中括弧( { )の前後
* 中括弧( } )の前

```
sum = 1 + 2 # 演算子の前後
e = M * c**2 # べき乗の演算子の前後にはスペースを入れない
a, b = 1, 2 # カンマの後ろ
1 > 2 ? true : false; puts 'Hi' # セミコロンの後ろ
[1, 2, 3].each { |e| puts e } # 中括弧周辺
```

**理由:**

* べき乗の演算子の前後にスペースを入れない理由は、乗算の演算子と見分けやすくするため


以下の部分にはスペースを記述しません。

* 括弧( ( )、角括弧( [ )の後ろ
* 括弧( ) )、角括弧( ] )の前

```
some(arg).other
[1, 2, 3].length
```


`case` 式と `when` 節のインデントは同じ深さにします。
ただし、 `case` 式を変数に代入するときは `when` 節に合わせず、単純なインデントで記述します。

```
# 良い例1
case
when song.name == 'Misty'
  puts 'Not again!'
when song.duration > 120
    puts 'Too long!'
else
  song.play
end

# 悪い例 (case式を変数に代入するときは、インデントを同じ深さにしない)
kind = case year
       when 1850..1889 then 'Blues'
       when 1890..1909 then 'Ragtime'
       else 'Jazz'
       end

# 良い例2
kind = case year
  when 1850..1889 then 'Blues'
  when 1890..1909 then 'Ragtime'
  else 'Jazz'
  end
```

**理由:**

* `case` 式と `when` 節のインデントは同じ深さにする理由:
  * 「[プログラミング言語Ruby](http://www.oreilly.co.jp/books/9784873113944/)」や
     「[初めてのRuby](http://www.oreilly.co.jp/books/9784873113678/)」がこの形式を使用しているため。
* `case` 式を変数に代入するときは `when` 節に合わせない理由:
  * 変数名が変わったとき、`when` 節以下のインデントも変える必要があるため。
     詳細は「メソッドに渡すパラメータ」の部分で後述します。
* 追記 (2012/04/28 19:46): この記事を公開した当初は「悪い例」を良い例としていました。
  「メソッドに渡すパラメータ」の部分と考え方を統一するため、「良い例2」を追記しました。
  [m4i](http://bojovs.github.com/2012/04/24/ruby-coding-style/#comment-512139116) さん、ありがとうございます!


`def` 式と `def` 式の間には空行を入れ、`def` 式内は論理的にまとまった処理の集まりごとに空行を入れます。

```
def some_method
  data = initialize(options)

  data.manipulate!

  data.result
end

def some_method
  result
end
```


メソッドに渡すパラメータは、80桁以上になる場合、メソッド呼び出しの次の行にインデントして表示します。

```
# 悪い例1 (1行が80桁以上。複数行に分割する必要がある)
def send_mail(source)
  Mailer.deliver(to: 'bob@example.com', from: 'us@example.com', subject: 'Important message', body: source.text)
end

# 悪い例2
def send_mail(source)
  Mailer.deliver(to: 'bob@example.com',
                 from: 'us@example.com',
                 subject: 'Important message',
                 body: source.text)
end

# 良い例
def send_mail(source)
  Mailer.deliver(
    to: 'bob@example.com',
    from: 'us@example.com',
    subject: 'Important message',
    body: source.text)
end
```

[https://github.com/bbatsov/ruby-style-guide](https://github.com/bbatsov/ruby-style-guide) では、
「悪い例2」が「good」として紹介されていて、「良い例」が「bad (normal indent)」として紹介されています。
なぜ「悪い例2」を悪い例としたかというと、

* メソッド名などが変わるたびに、その下に記述されているパラメータのインデント数も変わってしまう
* メソッド名の後にパラメータを記述すると、1行が長くなってしまう

ためです。例えば、「悪い例2」のメソッド `deliver` の名前が `deliver_to_me` などに変わったとき、
「悪い例2」のようなインデントの仕方をすると、`from` から `body` までの行のインデントも変える必要が出てきます。
バージョン管理ツールなどでソースコードの変更箇所を記録している場合、
インデントを直しているだけで記録する必要のない箇所も変更箇所として記録されてしまいます。


メソッド定義のとき、引数が無い場合は括弧を省略し、ある場合は括弧を記述するようにします。

```
def some_method
end

def some_method_with_arguments(arg1, arg2)
end
```


できるだけ `for` 式を使用せず、`each` メソッドを使用します。

```
arr = [1, 2, 3]

# 悪い例
for elem in arr do
  puts elem
end

# 良い例
arr.each { |elem| puts elem }
```

**理由:**

* `for` 式で使用する変数 (上の例でいう `elem`) が `for` 式の外からでも呼び出せてしまうため
  * `each` メソッドで使用する変数はブロックスコープ内で宣言されるため、ブロックの内側からでしか呼び出せない


`if/unless` 式には `then` を付加せず記述します。

```
# 悪い例
if some_condition then
end

# 良い例
if some_condition
end
```


`if/then/else/end` が1行で書けるような処理の場合は、代わりに三項演算子を使用します。

```
# 悪い例
result = if some_condition then something else something_else end

# 良い例
result = some_condition ? something : something_else
```


三項演算子がネストするようなときは、外側の条件分岐を `if/else` で記述します。

```
# 悪い例
some_condition ? (nested_condition ? nested_something : nested_something_else) : something_else

# 良い例
if some_condition
  nested_condition ? nested_something : nested_something_else
else
  something_else
end
```


`if` 式の `else` 句が必要なく、1行で記述できる場合は、後置 `if/unless` を使用します。

```
# 悪い例
if some_condition
end

# 良い例
do_something if some_condition
```


条件式に否定( ! )は使用せず、`unless` 式を使用します。

```
# 悪い例
do_something if !some_condition

# 良い例
do_something unless some_condition
```


`unless` 式では `else` 句を使用しません。`if` 式に書き換えます。

```
# 悪い例
unless success?
  puts 'failure'
else
  puts 'success'
end

# 良い例
if success?
  puts 'success'
else
  puts 'failure'
end
```

**理由:**

* ややこしくなるため。


`if/unless/while` 式の条件部には括弧を使用しません。

```
# 悪い例
if (x > 10)
end

# 良い例
if x > 10
end
```


以下のメソッドには括弧をつけません。その他のメソッドには括弧をつけます。

* Rake, Rails, RSpecなどにある内部DSLとなるメソッド (`render`, `response_with` など)
* キーワードのように扱われるメソッド (`attr_reader`, `puts` など)
* 属性のようにアクセスされるメソッド

```
class Person
  attr_reader :name, :age
end

temperance = Person.new('Temperance', 30)
temperance.name

puts temperance.age

x = Math.sin(y)
array.delete(e)
```


1行で記述されるブロックには中括弧 `{...}` を使用します。
その1行が複雑だったり横に長かったりする場合や、処理を複数行記述するときは、`do...end` を使用します。

```
names = ['Bozhidar', 'Steve', 'Sarah']

# 良い例1
names.each { |name| puts name }

# 悪い例1 (1行で簡潔な処理を do...end 内に記述している)
names.each do |name|
  puts name
end

# 悪い例2 (複雑で横に長い処理を1行で記述している)
names.each { |name| puts sugoku.nagai.shori(fukuzatsu.na.shori(name)) }

# 良い例2 (複雑な処理は複数行に分割する。複数行になるときは do...end を使用する)
names.each do |name|
  name = fukuzatsu.na.shori(name)
  name = sugoku.nagai.shori(name)
  puts name
end
```

追記 (2012/04/28 20:40): 「悪い例2」と「良い例2」を追記しました。
[m4i](http://bojovs.github.com/2012/04/24/ruby-coding-style/#comment-512139116) さん、ありがとうございます!


ブロックに対してメソッドチェインするときは、中括弧 `{...}` で囲まれたブロックに対して行います。

```
# 良い例
names.select { |name| name.start_with?("S") }.map { |name| name.upcase }

# 悪い例
names.select do |name|
  name.start_with?("S")
end.map { |name| name.upcase }
```


`return` が不要なときは記述しません。

```
# 悪い例
def some_method(some_arr)
  return some_arr.size
end

# 良い例
def some_method(some_arr)
  some_arr.size
end
```


メソッドの仮引数に値を代入するとき、`=` の両端にスペースを入れます。

```
# 悪い例
def some_method(arg1=:default, arg2=nil, arg3=[])
end

# 良い例
def some_method(arg1 = :default, arg2 = nil, arg3 = [])
end
```


`if` 式の条件部では変数の代入を行いません。

```
# 悪い例1
if (v = array.grep(/foo/)) ...

# 悪い例2
if v = array.grep(/foo/) ...

# 悪い例3
if (v = self.next_value) == "hello" ...

# 良い例
v = self.next_value

if v == 'hello' ...
```

**理由:**

* `==` と見分けがつきにくいため

[https://github.com/bbatsov/ruby-style-guide](https://github.com/bbatsov/ruby-style-guide) では
「悪い例1」と「悪い例3」が良い例として書かれていました。


すでに値が代入されているかもしれない変数の初期化には `||=` を使用します。

```
name ||= 'Bozhidar'
```

追記 (2012/04/28 20:54):「変数の初期化」から「すでに値が代入されているかもしれない変数の初期化」に修正しました。
[m4i](http://bojovs.github.com/2012/04/24/ruby-coding-style/#comment-512139116) さん、ありがとうございます!


真偽値の初期化を行うときは `||=` を使用してはいけません。

```
# 悪い例
enabled ||= true

# 良い例
enabled = true if enabled.nil?
```

**理由:**

* `nil` は偽として扱われないため
  * 追記 (2012/04/24 13:44): 「Rubyで論理値が必要になった場合、`nil` は `false` のように振る舞う (プログラミング言語Ruby P.76)」ため、この理由は間違いでした。
    [@noanoa07](https://twitter.com/#!/noanoa07/status/194643886067560449) さん、ありがとうございます!


メソッド名と開始括弧 ( ( ) の間にスペースを入れてはいけません。もし第一引数で括弧を使用していた場合、メソッドの括弧を必ず入力します。

```
# 悪い例1 (メソッド名と開始括弧の間にスペースが入っている)
p (3 + 2) + 1

# 悪い例2 (メソッド名と開始括弧の間にスペースは入っていないが、第一引数で括弧が使用されている)
p(3 + 2) + 1

# 良い例 (第一引数で括弧を使用していた場合、メソッドの括弧を必ず入力する)
p((3 + 2) + 1)
```

**理由:**

* メソッドの括弧なのか引数で使用する括弧なのかを明確にするため
  * 悪い例1と悪い例2とでは実行結果が異なります。
  * 追記 (2012/04/25 13:22): この記事を公開した当初は、悪い例2を良い例として取り上げていましたが、間違っていたため、書き直しました。
    [@n0kada](https://twitter.com/#!/n0kada/status/194980561813635073) さん、ありがとうございます!


Ruby 1.9では新しいハッシュ記法を使用します。

```
# 悪い例
hash = { :one => 1, :two => 2 }

# 良い例
hash = { one: 1, two: 2 }
```


Ruby 1.9では `lambda` メソッドをリテラルで記述します。

```
# 悪い例
lambda = lambda { |a, b| a + b }
lambda.call(1, 2)

# 良い例
lambda = ->(a, b) { a + b }
lambda.(1, 2)
```


使用しないブロック引数名は `_` にします。

```
# 悪い例
result = hash.map { |k, v| v + 1 }

# 良い例
result = hash.map { |_, v| v + 1 }
```


命名ルール
-----------------------------------------------------------

メソッドと変数には `snake_case` を使用します。


クラスとモジュールには `CamelCase` を使用します。
ただし、HTTP, XMLのような単語の頭文字を取った名前はそのまま全て大文字にします。


定数には `SCREAMING_SNAKE_CASE` を使用します。


返り値が真偽値のメソッドは、`Array#empty?` のように、名前の最後に `?` を付加します。


`self` を書き換えるような破壊的なメソッドの名前には、最後に `!` を付加します。


破壊的なメソッドを定義したとき、可能であれば、同じ返り値を返す非破壊的なメソッドも定義します。

```
class Array
  def flatten_once!
    res = []

    each do |e|
      [*e].each { |f| res << f }
    end

    replace(res)
  end

  def flatten_once
    dup.flatten_once!
  end
end
```


エイリアスが存在するメソッドは、どちらか一方を使用します。例えば、

* `collect` より `map`
* `detect` より `find`
* `find_all` より `select`
* `inject` より `reduce`
* `length` より `size`


コメント
-----------------------------------------------------------

あとで書く。


注釈
-----------------------------------------------------------

あとで書く。


クラス
-----------------------------------------------------------

あとで書く。


例外
-----------------------------------------------------------

あとで書く。


配列、ハッシュ
-----------------------------------------------------------

文字列が格納されるだけの配列の場合は、 `%w` を使用します。

```
# 悪い例
STATES = ['draft', 'open', 'closed']

# 良い例
STATES = %w(draft open closed)
```


ハッシュはRuby 1.9から追加されたリテラルを使用して記述します。

```
# 悪い例
hash = { :one => 1, :two => 2, :three => 3 } # 今までのハッシュリテラル

# 良い例
hash = { one: 1, two: 2, three: 3 }
```


文字列
-----------------------------------------------------------

文字列の結合は使用せず、式展開を使用します。

```
# 悪い例
email_with_name = user.name + ' <' + user.email + '>'

# 良い例
email_with_name = "#{user.name} <#{user.email}>"
```


式展開やバックスラッシュ記法( `\t` や `\n` など) を使用しない場合はシングルクォートを使用します。

```
# 悪い例
name = "Bozhidar"

# 良い例
name = 'Bozhidar'
```


大きな文字列を結合する場合は、`String#+` を使用せず `String#<<` を使用します。

```
html = ''
html << '<h1>Page title</h1>'

paragraphs.each do |paragraph|
  html << "<p>#{paragraph}</p>"
end
```

**理由:**

* `String#+` は非破壊的なメソッドであるため。`String#+` は文字列結合するたびに新しい文字列を生成する。
  そのため、`String#<<` のほうが速い。


正規表現
-----------------------------------------------------------

あとで書く。


パーセント記法
-----------------------------------------------------------

配列の中に文字列のみが含まれている場合は `%w` を使用します。

```
STATES = %w(draft open closed)
```


1行で記述できる文字列で、ダブルクォートと式展開を両方使用している場合は `%()` を使用します。
複数行に渡る場合はヒアドキュメントを使用します。

```
# 悪い例 (ダブルクォートが記述されていない)
%(This is #{quality} style)
# "This is #{quality} style" が好ましい

# 悪い例 (式展開が記述されていない)
%(<div class="text">Some text</div>)
# '<div class="text">Some text</div>' が好ましい

# 悪い例 (ダブルクォートが記述されていない)
%(This is #{quality} style)
# "This is #{quality} style" が好ましい

# 悪い例 (複数行の文字列になっている)
%(<div>\n<span class="big">#{exclamation}</span>\n</div>)
# ヒアドキュメントを使用するのが好ましい

# 良い例 (ダブルクォートと式展開が記述されている)
%(<tr><td class="name">#{name}</td>)
```


`%q` , `%Q` , `%x` , `%s` , `%W` は使用してはいけません。

**理由:**

* あとで調べる。
  * 追記 (2012/04/28 20:22): [https://github.com/bbatsov/ruby-style-guide](https://github.com/bbatsov/ruby-style-guide) に
    この記述があったので一応書いているんですが、なぜなんでしょうか?


メタプログラミング
-----------------------------------------------------------

あとで書く。


その他
-----------------------------------------------------------

オプション引数としてハッシュを使用するのは極力避けます。

**理由:**

* オプション引数が必要になるメソッドは、そのメソッドの中でいろいろなことをやり過ぎていることが多いため。
  メソッドを複数個宣言し、処理を分けたほうが良い。


不要なメタプログラミングは避けます。
