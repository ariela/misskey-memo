---
title: sshdの設定調整
order: 4
---

root接続、パスワード認証を無効化しておく。

```shell
$ sudo sed -E -i 's/^PasswordAuthentication yes/#PasswordAuthentication yes/g' /etc/ssh/sshd_config.d/50-cloud-init.conf
$ sudo sed -E -i 's/^PasswordAuthentication yes/#PasswordAuthentication yes/g' /etc/ssh/sshd_config
$ sudo sed -E -i 's/^PermitRootLogin yes/#PermitRootLogin yes/g' /etc/ssh/sshd_config

$ echo 'PasswordAuthentication no' | sudo tee -a /etc/ssh/sshd_config
$ echo 'PermitRootLogin no' | sudo tee -a /etc/ssh/sshd_config

$ sudo systemctl restart sshd.service
```