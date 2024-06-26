---
title: マイクロブログ「Mewst (ミュースト)」のベータ版をリリースしました
published_at: 2024-04-27T00:00:00.000Z
---

<img alt="" width="128" src="https://mewst.com/icon-192.png">

[Mewst (ミュースト) というマイクロブログサービスを作り始めている](https://shimba.co/2023-01-18-introducing-mewst) という記事を公開してから1年以上が経ちました。その間も細々と開発は続いていましたが、途中まで作ったものを壊したりしていたらこんなに時間が経ってしまいました。

作ったり壊したりを繰り返していくうちにサービスの方針が明確になってきたので、一旦今できているものをベータ版という形で公開しようと思います。

[https://mewst.com](https://mewst.com)

Mewstは160文字で今の気持ちや状況を記録できるマイクロブログです。緊張感なくほっとした気持ちで使えるサービスを目指しています。

具体的には以下のような特徴があります。

## タイムラインは時系列で表示されます

おすすめのタイムラインなどはありません。

サービスが提供するアルゴリズムによって表示されるポストは魅力的なものもありますが、何が出てくるかわからない怖さみたいなものもあるかなと思っています。
Mewstは自分がフォローしている人のポストだけ表示されるので、どんなポストを表示するかを自分で制御することができます。

## ポストに直接反応する手段は「スタンプ」のみ

メンションやリプライといった機能はありません。スタンプという他のサービスでいう「いいね」でのみ反応することができます。

<img width="396" alt="スタンプされている様子" src="https://github.com/mewstcom/mewst/assets/56767/d3aa7834-5627-4e44-b3fc-ede887492db9">

仲の良い人とは他のサービス上でも繋がっている (繋がる) と思いますし、直接やり取りしたいときはそちらのサービスで行うと良いかなと思っています。

開発当初はリプライ機能を追加していたんですが、まあ要らないかと思い消したところ見た目や実装もシンプルになりました。

「いいね」のような反応をスタンプと呼んでいるのは、悲しいポストなどにも押しやすくするためです。
「最近調子悪い…」みたいなポストに「いいね」されると、悪気がないことはわかっていてもちょっと微妙な気持ちになるので…。
「スタンプ」という表現には特に感情は含まれていないので、どんなポストに対しても「読んだよ」くらいの気持ちで押すことができ、押された側も「読まれたな」くらいの気持ちで受け取れます。

## スタンプ数などの数字は表示されません

押されたスタンプの数を集計して表示するといったことはしていません。

どのポストが人気かといったことが定量的にはわからないので物足りなさはあるかもしれませんが、数字を見て一喜一憂するところから少し距離を置きたい人には居心地が良いかもしれません。

## フォロー/アンフォロー情報は公開されません

ある人が誰をフォローしているのか・されているのかや、自分が誰にフォローされているのかといったことはわからないようになっています。
そのため他の人の目を気にせず気軽に好きな人だけフォローすることができます。

また、スタンプ数と同じようにフォロー数やフォロワー数も表示されません。
フォロワー数をドラゴンボールの戦闘力のように扱っているのは見ていて楽しい一方疲れることもあるので、表示しないようにしています。

## 画像や動画をアップロードする機能がありません

画像や動画はテキストと比べるとファイルサイズが大きいため、保管するのにはそれなりにお金がかかります。

Mewstは個人が運営しているサービスなので、サーバー費にかけられるお金はあまりありません。Mewstをなるべく長く運営するには出費をなるべく抑えることが大切なので、保管にお金がかかる画像や動画は扱わないことにしました。
アバター画像も画像のURLを保存してもらい、それを表示するだけにしています。
でもまあアバター画像くらいはアップロードできても良いかな…。

画像がアップロードできないのは初期のTwitterもそうでした。
(Twitterはアバター画像はアップロードできましたが)

Twitterに画像をアップロードできない間は[Twitpic](https://ja.wikipedia.org/wiki/Twitpic)やInstagramなど画像に特化したサービスにアップロードし、そのURLをツイートしていました。
他のサービスを組み合わせるこのやり方は個人的に好きなので、Mewstでも同じようにできないかなと思っています。

Mewstにはポストカードを表示する機能があるので、画像を見せたいときは他の写真アプリなどに画像をアップロードしてURLをポストすることで実現できます。

<img width="752" alt="Mewstに表示されたポストカードの様子" src="https://github.com/mewstcom/mewst/assets/56767/11350530-eb46-4363-a7ee-d2aea904a638">

Mewstではこのように他のサービスとうまいこと連携して、コア機能はなるべく小さいまま色んなことができるサービスにしていきたいです。

うまいこと連携するための機能 (OAuthやWeb API) は今はまだありませんが、今後追加したいと思っています。

---

既存のサービスと比べるとできないことだらけで不便かもしれませんが、試していただけたら嬉しいです。

[https://mewst.com](https://mewst.com)

僕のプロフィールページはこちらになります。

[https://mewst.com/@shimbaco](https://mewst.com/@shimbaco)

Mewstに関することは以下のサービスで発信しています。
良かったらフォローなどお願いします。

- [Mewst](https://mewst.com/@mewst)
- [Bluesky](https://bsky.app/profile/mewst.com)
- [Discord](https://discord.gg/tNwVpJ4Jfk)
- [Threads](https://www.threads.net/@mewstcom)

また、ソースコードも公開して開発しています。
もし興味あればgit cloneなどお願いします。

[https://github.com/mewstcom/mewst](https://github.com/mewstcom/mewst)

居心地の良いマイクロブログになりたいMewstをよろしくお願いします。
