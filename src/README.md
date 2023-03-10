---
title: Misskey構築/運用メモ
icon: home
order: 1
---
# Misskey構築・運用系メモ

結構詰まったりドキュメント読むだけでは解決出来なかったりしたのでちょっとずつメモを残していくことにした。

## サーバーの基本構築

### 不要パッケージを削除する
使用しているサーバーによって異なるので適宜。
```
sudo apt autoremove
sudo apt clean
```

### monitの導入
### Mackerelの導入
APIキーはサイトからとる。

```
wget -q -O - https://mackerel.io/file/script/setup-all-apt-v2.sh | MACKEREL_APIKEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' sh
sudo apt install mackerel-agent-plugins
sudo vi /etc/mackerel-agent/mackerel-agent.conf
sudo systemctl reload mackerel-agent.service
```

```
[plugin.metrics.nginx]
command = "mackerel-plugin-nginx"

[plugin.metrics.docker]
command = ["mackerel-plugin-docker", "-name-format", "name"]
```

## Misskeyの実行まで
## docker-compose を systemd で実行する
## リバースプロクシの設定
## 証明書取得(Let's Encrypt) 
## Cloudflareの設定
## オブジェクトストレージの設定

## Botプロテクション
## Summaly Proxy
## プロキシアカウント
## 絵文字のインポート
## ロールの設定
## キャッシュ削除
```
docker system prune -a
```
