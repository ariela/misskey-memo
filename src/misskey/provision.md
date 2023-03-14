---
title: 準備
order: 1
---

[ドキュメント](https://misskey-hub.net/docs/install.html)とは異なる手法でデプロイを行います。


## 方針
[DockerHub](https://hub.docker.com/r/misskey/misskey)にて恐らく公式のイメージがアップロードされているため、このイメージを使用してdocker-composeによる実行の方式で作成します。

## 準備
```shell
$ sudo mkdir -p /opt/services/misskey/.config
$ sudo chown -R ${USER}:docker /opt/services
$ ln -s /opt/services ~/services
$ cd ~/misskey
```

## docker-compose.yml の作成
公式の[docker-compose.yml.example](https://github.com/misskey-dev/misskey/blob/develop/docker-compose.yml.example)を使用して作成します。

下記内容ではファイルをオブジェクトストレージに保存し、Redisの設定を変更出来るように修正しています。

```shell
$ curl -o docker-compose.yml https://raw.githubusercontent.com/misskey-dev/misskey/develop/docker-compose.yml.example
```

```diff
@@ -19,16 +19,17 @@
       - internal_network
       - external_network
     volumes:
-      - ./files:/misskey/files
       - ./.config:/misskey/.config:ro

   redis:
     restart: always
     image: redis:7-alpine
+    command: "redis-server /etc/redis.conf"
     networks:
       - internal_network
     volumes:
       - ./redis:/data
+      - ./.config/redis.conf:/etc/redis.conf
     healthcheck:
       test: "redis-cli ping"
       interval: 5s
```

## Dockerfileの作成

アイコンの置き換えを行うので、ファイルをコンテナイメージへ入れれるようにDockerfileを作成します。
変更を行う必要が無ければ `docker-compose.yml` の `web` で使用するイメージを `build: .` を `image: misskey/misskey` などに指定するだけでも対応可能です。

```Dockerfile
FROM misskey/misskey:13.9
COPY --chown=misskey:misskey . ./
```

## 各種設定ファイルの作成
`default.yml`と`docker.env`を用意します。内容については各環境に応じて変わるので割愛します。

```shell
$ curl -o .config/default.yml https://raw.githubusercontent.com/misskey-dev/misskey/develop/.config/docker_example.yml
$ curl -o .config/docker.env https://raw.githubusercontent.com/misskey-dev/misskey/develop/.config/docker_example.env

$ vi .config/default.yml
$ vi .config/docker.env
```

`redis.conf` は基本的な設定のみやっています。状況に応じてチューニングを行う場合はあります。

```shell
echo 'tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize no
activedefrag yes
# active-defrag-ignore-bytes 100mb
# active-defrag-threshold-lower 10
# active-defrag-threshold-upper 100
# active-defrag-cycle-min 1
# active-defrag-cycle-max 25
# active-defrag-max-scan-fields 1000' | tee .config/redis.conf
```


## サービス化する
systemctlでサービス停止/起動を行うなうため、サービス化を行います。

```shell
$ echo '[Unit]
Description=Misskey by docker-compose
Requires=docker.service

[Service]
Type=simple

Environment=COMPOSE_FILE=/opt/services/misskey/docker-compose.yml

ExecStart=/usr/bin/docker compose -f ${COMPOSE_FILE} up
ExecStop=/usr/bin/docker compose -f ${COMPOSE_FILE} stop 

[Install]
WantedBy=multi-user.target' | sudo tee /lib/systemd/system/misskey.service
$ sudo ln -s /lib/systemd/system/misskey.service /etc/systemd/system/misskey.service
$ sudo systemctl daemon-reload

$ sudo systemctl enable misskey.service
$ sudo systemctl start misskey.service
$ sudo systemctl status misskey.service
```

