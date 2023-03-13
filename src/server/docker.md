---
title: dockerの設定
order: 5
---

```shell
$ echo '[Unit]
Description=Misskey by docker-compose
Requires=docker.service

[Service]
Type=simple

Environment=COMPOSE_FILE=/home/****/misskey/docker-compose.yml

ExecStart=/usr/bin/docker compose -f ${COMPOSE_FILE} up
ExecStop=/usr/bin/docker compose -f ${COMPOSE_FILE} stop 

[Install]
WantedBy=multi-user.target' | sudo tee /lib/systemd/system/misskey.service
$ sudo ln -s /lib/systemd/system/misskey.service /etc/systemd/system/misskey.service
$ sudo systemctl daemon-reload
$ sudo systemctl enable misskey.service
$ sudo systemctl status misskey.service
```