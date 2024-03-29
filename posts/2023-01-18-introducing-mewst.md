---
title: Mewst (ミュースト) というマイクロブログサービスを作り始めている
published_at: 2023-01-18T00:00:00.000Z
---

昨年末あたりからTwitterが音楽性の違いを見せ始めてきました。
このまま使い続けるのもなんかなあと思い始め、[Mastodon](https://mastodon.social/@shimbaco)を使い始めるようになりました。

MastodonはTwitterには無い機能などもあって結構良いんですが、分散型という仕組みが機能を複雑にしているような気がしています。
具体的には誰かをフォローするときのステップ数が多いです。同じサーバの人をフォローするならTwitterと同じ感じでできますが、
別のサーバの人をフォローするときは一度その人のプロフィールURLをコピーし自分のサーバ上にペーストして、それでフォローボタンを押すといったステップを踏む必要があるはずです。
分散型という特性は面白いものだとは思いますが、個人的にはあまり興味が無いというのもあり、単に複雑なものを使っているという気持ちになります。

というような気持ちを去年の11月6日にツイートしたりしていました。

[https://twitter.com/shimbaco/status/1588925720587534336](https://twitter.com/shimbaco/status/1588925720587534336)
> 正直Mastodonの分散型としての側面にはあまり興味がなく、別のインスタンスの人をフォローするときに面倒みたいなところが少し気になる。つまりJaikuとかWassr復活してほしい🙏

昔は[Jaiku](https://ja.wikipedia.org/wiki/Jaiku)とか[Wassr](https://ja.wikipedia.org/wiki/Wassr)とかがあって、Twitterが落ちたりしていたときは避難先として使っていました。
そこでも (僕がフォローしている範囲で) ちょっとしたコミュニティが形成されていて、Twitter落ちてるね〜みたいなやり取りをして楽しんでいました。
最近は僕の観測範囲が狭いこともあるかもしれないですが、そういったサービスが見当たらないです。いろんな人がオレオレTwitterを作ってくれないかなあと思っていました。

[https://twitter.com/shimbaco/status/1593503745530220544](https://twitter.com/shimbaco/status/1593503745530220544)
> Twitterには穏やかに存続してほしいけど、オレオレTwitterみたいなのが乱立するところも見たいな

思っていたんですが、他力本願なのもなんかなあという気持ちになり、自分で作るか！と思って作り始めました。

Mewst (ミュースト)<br>
[https://www.mewst.com](https://www.mewst.com)

まだ全然何もできないのでアルファ版という体裁で公開しています。現在は開発者である僕しかログインできないし投稿もできないです。
ログインすると一応フォロー機能やタイムラインは存在します。けどまだそのくらいしか機能が無いです。
自分が音楽性の違いに対してどう向き合おうとしているかを意思表示したかったのでこの記事と一緒に公開しました。

外からはプロフィールと投稿ページは見れるようになっています。僕のプロフィールページはこちら:<br>
[https://www.mewst.com/@shimbaco](https://www.mewst.com/@shimbaco)

Twitterにクロスポイントする機能は先に追加したので、とりあえず今はしょぼい投稿専用のTwitterクライアントとして機能します。
しばらくツイートしてこなかったけど、これからはMewstを経由してツイートしようかなと思っています。

今後のMewstのアップデートについてはこのブログや[MewstのTwitterアカウント](https://twitter.com/joinmewst)などでお知らせしていきたいです。

この記事を書いているとき、GitHubのプロフィールと同じように https://mewst.com/@shimbaco.atom というURLにアクセスしたらAtomフィードが出力されるようにすればRSSリーダーで読めるようになるので、
アルファ版の状態でも外部にお知らせする手段として使えそうだなと思い始めたので機能追加しようと思いました。マイクロブログ開発すごく楽しいです。

ベータ版に向けて動き始めたMewstをよろしくお願いします。

[https://www.mewst.com](https://www.mewst.com)
