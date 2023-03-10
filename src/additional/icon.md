---
title: アイコン設定
order: 1
---

設定画面からでは全てのアイコンを変更する事が出来ず、PWA化した際などにMisskeyのアイコンが出てしまう事がある。
これらリソースはMisskeyによってハードリンクされてしまっている事からコンテナのビルド時に実ファイルを置き換える事によってアイコンを変更する事が可能であった。

## Misskeyアイコンの場所

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

## アイコンファイル置き換え後
アイコンファイルを置き換えただけでは反映できず、コンテナの再ビルドが必要となる。

[公式ドキュメント](https://misskey-hub.net/docs/install/docker.html)に従い、コンテナのアップデートと再起動を行う事で反映が可能。

```shell
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```


## 参考: manifest.json の内容

```json
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