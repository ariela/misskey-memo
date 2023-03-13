---
title: 構築コマンド
order: 1
tag:
    - MIP
---

- [パッケージ情報最新化](/misskey-memo/server/latest-packages.html)

## NTP設定
```shell
$ sudo apt install chrony

$ sudo sed -E -i 's/^(pool (.*)ubuntu(.*))/# \1/g' /etc/chrony/chrony.conf
$ echo 'pool ntp.nict.jp iburst' | sudo tee -a /etc/chrony/chrony.conf
$ sudo systemctl restart chrony.service
$ chronyc sources
```


## 管理用ユーザ追加
```shell
adduser --shell /usr/bin/bash -uid 1200 --ingroup adm <ユーザ名>

sudo -u <ユーザ名> mkdir -p /home/<ユーザ名>/.ssh
sudo -u <ユーザ名> chmod 700 /home/<ユーザ名>/.ssh
cat /root/.ssh/authorized_keys | sudo -u <ユーザ名> tee /home/<ユーザ名>/.ssh/authorized_keys
sudo -u <ユーザ名> chmod 600 /home/<ユーザ名>/.ssh/authorized_keys
vi /etc/sudoers
```

## Dockerのインストール

```shell
$ sudo apt update
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt install -y docker-ce docker-ce-cli containerd.io net-tools
$ sudo gpasswd -a <ユーザ名> docker
$ sudo reboot
```

## nginxのインストール

```
sudo apt install -y nginx
sudo ufw allow 'Nginx Full'
sudo ufw status
systemctl status nginx
```

## certbotのインストール
```
sudo apt install certbot
sudo certbot certonly --webroot -w /var/www/html -d <misskeyのドメイン名>
sudo certbot certonly --webroot -w /var/www/html -d <misskeyのメディア用ドメイン名>
```

