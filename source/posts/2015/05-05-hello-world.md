---
title: 個人サイトを作り直した
date: 2015-05-05
template: post.jade
---

# 個人サイトを作り直した

最近、2008年ごろから使っていた「bojovs」というハンドルネームをやめて
「shimbaco」という名前に切り替えました。
前の個人サイトは[bojovs.com](http://bojovs.com/) というドメインで運用していたので、
今回から[shimba.co](http://www.shimba.co) というドメインでやっていくことにしました。

それと、前は「[Middleman](https://middlemanapp.com/)」という静的サイトジェネレータを使ってましたが、
今回から「[Metalsmith](http://www.metalsmith.io/)」というものを使い始めました。
すごくシンプルで、細かいことも調整しやすいので良い気がします。

Metalsmithを使ったブログ作成話はまた今度ブログに書きたいです。
やりたいことをゴリ押ししたところなんかも少しあるので、その辺も含めて…。
モノ自体は[GitHubで公開しています](https://github.com/shimbaco/shimbaco)。

Metalsmithによって生成されたHTMLはAmazon S3に置いて運用しています。
今のところS3へのアップロードはマネジメントコンソールから手でガッと
ドラッグアンドドロップしてる感じなので、Gulpか何かで自動化できたらなと思います。

三日三晩寝ながら作ったこのサイトをよろしくお願いします。
僕はアニメ「のだめカンタービレ」の視聴に戻ります。
