---
title: 個人サイトをSvbtleにした
published_at: 2019-01-06T00:00:00.000Z
---

`shimba.co` というドメインで自分のホームページを公開していたんだけど、それを[Svbtle](https://svbtle.com)で運用することにした。[一年くらい前にJekyllで運用するようにした](/2018-02-24-hello-world-again)んだけど、メンテが地味に面倒になったのでSaaS (と言って良いのかな？) を利用することにした。Jekyll時代のページもブログと数個の外部リンク (TwitterとかGitHubとかへのリンク) くらいしかコンテンツが無かったので、サイト全体をSvbtleに変えても特に問題なかった。

Svbtleは有料のブログプラットフォームで、有料なところとシンプルなデザインが気に入った。無料で提供しているところはどうしても広告みたいなもので収益化しようとするので、広告とかPV増幅装置みたいなものでページがワチャワチャしがちで厳しい。Svbtleは広告が表示されないしシェアボタンなどの設置も任意に設定できるのでページがすっきりして良い。ほとんど更新しないサイトに月数ドル払うのはどうなんだろ…とも思ったけど、こういうプラットフォームは持続してほしいし、払ったからには何かしら更新しないと…という意識が芽生えると良いなということでお布施した。

たまに更新できたら良いな。

**追記 (2019年1月6日 15時18分)**: [HTTPSでアクセスするようにするには管理者にメールを送る必要がある](https://svbtle.com/help/custom_domain)ということで、この記事を書いたあとHTTPSでアクセスできるようにしてというメールを送ったけど返事が来ない。管理者ー！早く来てくれー！

**追記 (2019年1月6日 19時36分)**: 全然返事が来ないのでCloudFrontをかまして無理やりHTTPS化した。RSSフィードのURLとか `canonical` タグのURLがHTTPのままなのが気になるけど、一時的な対応ということで。😏

**追記 (2019年2月2日 12時54分)**: 相変わらず返事が無いので「[Write.as](https://write.as/)」に乗り換えることにした。