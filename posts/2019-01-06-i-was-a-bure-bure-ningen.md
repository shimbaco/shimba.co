---
title: Annictを作る人として軸がぶれていた
published_at: 2019-01-06T01:00:00.000Z
---

[![kizaki.jpg](https://svbtleusercontent.com/w4zANYWCr4ZgyYKsFUUVzN0xspap_small.jpg)](https://svbtleusercontent.com/w4zANYWCr4ZgyYKsFUUVzN0xspap.jpg)

(この湖は軸がぶれてない。素敵。)

2019年に入ってから一週間くらい経つけど去年の思い出話を書く。

去年の後半はAnnictに対して表立った改修がほとんどできなかった。下の画像は2019年1月6日現在のお知らせ一覧だけど、6月に更新を行ってから12月末になるまで更新が途絶えている。(7月のお知らせは機能停止のお知らせなのでノーカンとしている)

[![Annict 2019-01-06 06-36-37.png](https://svbtleusercontent.com/o6fCnnokk9ZfbWbym2gM820xspap_small.png)](https://svbtleusercontent.com/o6fCnnokk9ZfbWbym2gM820xspap.png)

[github.com/annict/annict](https://github.com/annict/annict) も6月くらいから低迷している。

[![annict 2019-01-06 06-29-50.png](https://svbtleusercontent.com/a9nqhxEX2DVeTfeueDbYRL0xspap_small.png)](https://svbtleusercontent.com/a9nqhxEX2DVeTfeueDbYRL0xspap.png)

6月くらいから何をしていたかと言うと、Annictのシステムを一新する作業を始めていた。今思えば「V3作り始めます宣言」をDiscordに投下してから軸がぶれ始めたと思う…。
(AnnictのDiscordサーバはこちらです: https://discord.gg/PVJRUKP)

[![#dev - Discord 2019-01-06 06-33-14.png](https://svbtleusercontent.com/38bxHnooKUYQvRW2UTZTMb0xspap_small.png)](https://svbtleusercontent.com/38bxHnooKUYQvRW2UTZTMb0xspap.png)

当初は下記のような構想を考えていた。

- Railsで作られている現行システムをElixir/Phoenixで書き直す
- フロント部分を [github.com/annict/annict](https://github.com/annict/annict) とは別のリポジトリにして、バックエンドとフロントエンドを完全に分ける
- フロントエンドとバックエンドとのやり取りには外部にも公開するGraphQL APIを使用してドッグフーディングする

その後Elixirよりしっくり来る言語は無いかなと思い始めて[Reason](https://reasonml.github.io/)とか[Crystal](https://crystal-lang.org/)を触ったものの、Annictを作り直すにはどの言語も色々な車輪を再発明する必要があることがわかり、やっぱりRailsが一番！みたいな気持ちになったりとフラフラしていた。フロント側もTypeScriptを導入するしないを考えたり、Reasonを触り始めたこともあってVue.jsからReactに乗り換えようかなみたいなことを考えたりしてフラフラしていた。インフラ周りではApp EngineやAWSに移行できないかの調査を始めたり、やっぱりPaaSとかIaaSは値段が高いなと思い始めてDigitalOceanで運用しようとしたりしていた。どれも道半ばで挫折している。

Annictをどう作り直すかでフラフラしている中、はてなブックマーク (以下はてブ) の代替を目指すソーシャルブックマークサービスを作り始めたりもしていた。はてブを使い続けるのが厳しくなったというのもあるけど、Annictをどう作り直すかを悶々と考えるうちに別のことがしたくなったというのが本音だと思う。

> 平成も終わろうとしているこのご時世にソーシャルブックマークサービスを作り始めてる。タグ管理できるHBFavみたいな感じを目指してる。リリースまで漕ぎ着けられると良いな〜
>
> https://twitter.com/shimbaco/status/1066359691742130177

こんな感じで軸がブレブレになっていたんだけど、秋アニメが豊作だったからか目立った更新をしていない期間も利用者が増加したり (更新 = 利用者増加とは思っていないけど) Annictの可能性を再認識する機会があったりで、低迷していたモチベーションが12月頃からぐーんと上がった。再び考えた結果以下のようにやっていくことにした。

**Railsを使い続ける。** 以前から触っていて使い慣れているし、エコシステムが成熟しているから現状Railsが一番楽に作れる。

**Herokuを使い続ける。** 時間はお金より大切、なので。

**一気に書き直そうとせず、ページやコンポーネントごとに少しずつ書き直していく。** 昔は機能やページが少なかったから一気に書き直すこともできたけど、その後いろいろと追加された今では難しいことがわかった…。

**はてブでブックマークする習慣を断つ。** もともと厳しさを感じる箇所がブックマーク周りだったので、「ブックマークしなければ新しくソーシャルブックマークを作らなくて済むじゃん」という考えに至り習慣を断つことにした。はてブを利用しているときは何でもかんでもブックマークしていたけど、今はあとから見返すことがありそうなページだけ[Pocket](https://getpocket.com)に保存するようにしている。[Swarm](https://www.swarmapp.com)のチェックインみたいなノリでブックマークを楽しんでいたから今の運用だと物足りないんだけど、きっと慣れる…はず。

GraphQL APIを内部でも使用してドッグフーディングしたい気持ちは今も変わっていないので、ページごとにAPIを充実させて少しずつ作り直していこうと思っている。

ここまでが去年の終わり頃にぼんやりと考えていたことで、その後年末に「[Annict Developers](https://developers.annict.jp)」を公開したり[PC版のナビゲーションメニューに改修を入れる](https://annict.jp/forum/posts/293)などした。今は人物や団体、キャラクターなどの情報が取得できるAPIエンドポイントを作っている。[今年の冬アニメの期間にやることをGItHub Projectsで公開し始めた](https://github.com/orgs/annict/projects/3)ので、今後はこれに沿って開発を進めていく。

約5年前から「俺が考える最強のアニメ視聴記録サービス」を求めて作り続けてきたけど、まだまだ完成には程遠い。今年もなるべくそこに近づけるよう無理せず開発を続けていきたい。
