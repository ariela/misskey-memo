---
title: DBバックアップ
order: 1
---

Misskeyはデータベースさえちゃんとバックアップが取れていると復旧が容易なのでバックアップを取得します。
一応日時バックアップとしていますが、ローテートさえちゃんと組んでしまえば時間とかでも良いかもしれません。


```shell
$ echo '#!/usr/bin/bash

MISSKEY_DIR=/opt/services/misskey
BACKUP_DIR=/home/user/backup
BACKUP_FILE_NAME=$(date +"%Y%m%d%H%M%SZ").dump.xz

source ${MISSKEY_DIR}/.config/docker.env

cd ${MISSKEY_DIR}
docker compose exec db pg_dump --create --clean --if-exists -U ${POSTGRES_USER} ${POSTGRES_DB} | xz -9 -c > ${BACKUP_DIR}/${BACKUP_FILE_NAME}

cd ${BACKUP_DIR}
s3cmd put ${BACKUP_FILE_NAME} s3://misskey-backup
' | sudo tee /usr/local/bin/misskey-db-backup
$ sudo chmod +x /usr/local/bin/misskey-db-backup
$ crontab -e
```

```
00 18 * * * /usr/local/bin/misskey-db-backup
```
