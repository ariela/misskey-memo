# Misskey構築・運用系メモ

結構詰まったりドキュメント読むだけでは解決出来なかったりしたのでちょっとずつメモを残していくことにした。
ちゃんとしたドキュメント化は気が向いたら。

## サーバーの基本構築

### サーバー上で画像表示できるようにする
macOSのiTerm2ではコマンドをサーバーに配置しておくことで画像をターミナル上で表示が可能となるため、設定を行う。
```
sudo curl -o /usr/local/bin/imgcat https://iterm2.com/utilities/imgcat
sudo chmod +x /usr/local/bin/imgcat
```

## Misskeyの実行まで
## リバースプロクシの設定
## 証明書取得(Let's Encrypt) 
## Cloudflareの設定
## オブジェクトストレージの設定
## Mailgunの設定（サービス運用には非推奨）
## Botプロテクション
## Summaly Proxy
## プロキシアカウント

## manifest.json

```
{
    "short_name": "<hoge>",
    "name": "<hoge>",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#<hoge colorhex>",
    "theme_color": "#<fuga colorhex>",
    "icons": [
        {
            "src": "/static-assets/icons/192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/static-assets/icons/512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/static-assets/splash.png",
            "sizes": "300x300",
            "type": "image/png",
            "purpose": "any"
        }
    ],
    "share_target": {
        "action": "/share/",
        "method": "GET",
        "enctype": "application/x-www-form-urlencoded",
        "params": {
            "title": "title",
            "text": "text",
            "url": "url"
        }
    }
}
```

## Miアイコンの場所メモ

`misskey/packages/backend/assets`
| ファイル名 | サイズ | 画像例 |
|---------|------|------|
| favicon.ico | 128x128 | |
| favicon.png | 128x128 | ![iTerm2 uPvsHV favicon](https://user-images.githubusercontent.com/31660/223339870-b6d4565c-8ad6-4f2b-9e5b-4378b5a3d0f7.png) |
| mi-white.png | 288x288 | ![iTerm2 4BaNaj mi-white](https://user-images.githubusercontent.com/31660/223339918-b1b76c38-4900-4ac8-b77c-48ecd751ad5e.png) |
| apple-touch-icon.png | 256x256 | ![iTerm2 2a1v5I apple-touch-icon](https://user-images.githubusercontent.com/31660/223340142-802619d4-8d36-4a9b-8aaf-f56fb20ae41e.png) |
| splash.png | 300x300 | ![iTerm2 bZKEeS splash](https://user-images.githubusercontent.com/31660/223340692-b723e13f-8919-49e2-bcca-1a62724293a4.png) |

`misskey/packages/backend/assets/icons`
| ファイル名 | サイズ |
|---------|------|
| 192.png | 192x192 |
| 512.png | 512x512 |

## 絵文字のインポート
## ロールの設定
## 
