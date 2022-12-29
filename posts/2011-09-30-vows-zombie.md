---
title: VowsとZombie.jsでExpress, MongooseなNode.jsアプリのテストを書いたよ
published_at: 2011-09-30T00:00:00.000Z
---

## 環境

* Node.js 0.4.9
* [Express](http://expressjs.com/) 2.4.6
* [Mongoose](http://mongoosejs.com/) 2.2.2
* [Vows](http://vowsjs.org/) 0.5.11
* [Zombie.js](http://zombie.labnotes.org/) 0.10.1
* [request](https://github.com/mikeal/request) 2.1.1


## 流れ

最初に、モデル内のドキュメントを削除するコードと、サーバを起動するコードを記述します。

**test/helper.js**

```
var mongoose = require('mongoose')
  , app = require('../app')
  , Post    = require('../models/post').Post
  , User    = require('../models/user').User;

var serverActivity = false
  , models = [Post, User];


process.on('exit', function () {
  // サーバが起動していたら終了する
  if (serverActivity) {
    app.close();
  }
});

module.exports = {

  /**
   * 配列modelsに入っているドキュメントを全て削除する
   */

  initDB: function initDB(callback, count) {
    var cnt = count || 0;
    models[cnt].remove(function () {
      cnt += 1;
      if (cnt === models.length) {
        callback();
      } else {
        initDB(callback, cnt);
      }
    });
  },

  /**
   * サーバが起動していなかったら起動する
   */

  readyServer: function (callback) {
    if (serverActivity) {
      process.nextTick(callback);
    } else {
      serverActivity = true;
      app.listen(3030, function () {
        process.nextTick(callback);
      });
    }
    return;
  }
};
```


次に、実際にテストを書いていきます。

**test/controllers/posts.test.js**

```
var assert  = require('assert')
  , request = require('request')
  , vows    = require('vows')
  , zombie  = require('zombie')
  , helper = require('../helper')
  , Post = require('../../models/post').Post;

var url = 'http://localhost:3030';


vows.describe('posts').addBatch({
  'GET /': {
    topic: function () {
      helper.readyServer(this.callback);
    },
    'after readyServer': {
      topic: function () {
        request(url + '/', this.callback);
      },
      'should response 200': function (err, res, body) {
        assert.equal(res.statusCode, 200);
      }
    }
  },

  'GET /posts': {
    topic: function () {
      helper.initDB(this.callback);
    },
    'after initDB': {
      topic: function () {
        var post = new Post({ title: 'hello world' });
        post.save(this.callback);
      },
      'after saving post': {
        topic: function (err, post) {
          helper.readyServer(this.callback);
        },
        'after readyServer': {
          topic: function () {
            zombie.visit(url + '/posts', this.callback);
          },
          'should display the post': function (err, browser, status) {
            assert.equal(browser.text('ul#posts li'), 'hello world');
          }
        }
      }
    }
  }
}).export(module);
```

12行目から24行目までは、

1. サーバを起動して
2. http://localhost:3030/ にアクセスしたら
3. 200 が返ってくるべき

という処理になっています。26行目から49行目までは、

1. データベースを初期化して
2. タイトルが「hello world」なポストを保存して
3. サーバを起動したあとに
4. http://localhost:3030/postsにアクセスしたら
5. リスト内に「hello world」が表示されているべき

という処理になっています。

Vowsでは、`topic` という関数の中で `this.callback` という関数を使うことができます。
この関数を、`helper.initDB` や `helper.readyServer` などのコールバック関数を引数に持つ関数に渡し、
その下にさらに `topic` 関数をネストして記述することで、非同期的な命令を順番に処理させることができるようです。

ただ、結構冗長なコードになっているので、もう少し簡潔に書けないかなあと思っています。
みんなはどうしているんだろう…。
