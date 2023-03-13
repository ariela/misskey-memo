---
title: Monitの設定
order: 10
---

プロセスの監視・再起動を行う為、monitを導入して監視・再起動処理を定義する。

## Monitのインストール
```shell
$ sudo apt install monit
```

## Monitの設定
```shell
$ echo 'set daemon  120
set log /var/log/monit.log
set idfile /var/lib/monit/id
set statefile /var/lib/monit/state
 set eventqueue
     basedir /var/lib/monit/events
     slots 100
set httpd port 2812 and
    use address localhost
    allow localhost
    allow admin:monit
include /etc/monit/conf.d/*
include /etc/monit/conf-enabled/*' | sudo tee /etc/monit/monitrc
```

### sshdのモニタリング追加
```shell
echo 'sshd: 127.0.0.1' | sudo tee -a /etc/hosts.allow
echo 'check process sshd
      with pidfile "/var/run/sshd.pid"
      start program = "/usr/bin/systemctl start sshd.service"
      stop program = "/usr/bin/systemctl stop sshd.service"
      if 5 restarts within 5 cycles then alert
      if failed port 22 protocol ssh with timeout 10 seconds then restart' | sudo tee /etc/monit/conf.d/sshd
```

### crondのモニタリング追加
```shell
echo 'check process crond
      with pidfile "/var/run/crond.pid"
      start program = "/usr/bin/systemctl start cron.service"
      stop program = "/usr/bin/systemctl stop cron.service"
      if 5 restarts within 5 cycles then alert' | sudo tee /etc/monit/conf.d/crond
```

## chronyのモニタリング追加
```shell
echo 'check process chronyd
      with pidfile "/var/run/chrony/chronyd.pid"
      start program = "/usr/bin/systemctl start chrony.service"
      stop program = "/usr/bin/systemctl stop chrony.service"
      if 5 restarts within 5 cycles then alert' | sudo tee /etc/monit/conf.d/chronyd
```

## tailscaledのモニタリング追加
```shell
echo 'check process tailscaled
      matching "tailscaled"
      start program = "/usr/bin/systemctl start tailscaled.service"
      stop program = "/usr/bin/systemctl stop tailscaled.service"
      if 5 restarts within 5 cycles then alert
      if failed unixsocket /var/run/tailscale/tailscaled.sock with timeout 10 seconds then restart' | sudo tee /etc/monit/conf.d/tailscaled
```

### dockerのモニタリング追加
```shell
echo 'check process docker
      with pidfile "/var/run/docker.pid"
      start program = "/usr/bin/systemctl start docker.service"
      stop program = "/usr/bin/systemctl stop docker.service"
      if 5 restarts within 5 cycles then alert
      if failed unixsocket /run/containerd/containerd.sock with timeout 10 seconds then restart' | sudo tee /etc/monit/conf.d/docker
```

### nginxのモニタリング追加
```shell
echo 'check process nginx
      with pidfile "/var/run/nginx.pid"
      start program = "/usr/bin/systemctl start nginx.service"
      stop program = "/usr/bin/systemctl stop nginx.service"
      if 5 restarts within 5 cycles then alert
      if failed port 80 protocol http with timeout 10 seconds then restart
      if failed port 443 protocol https with timeout 10 seconds then restart' | sudo tee /etc/monit/conf.d/nginx
```


### mackerel-agentのモニタリング追加
```shell
echo 'check process mackerel-agent
      with pidfile "/var/run/mackerel-agent.pid"
      start program = "/usr/bin/systemctl start mackerel-agent.service"
      stop program = "/usr/bin/systemctl stop mackerel-agent.service"
      if 5 restarts within 5 cycles then alert' | sudo tee /etc/monit/conf.d/mackerel-agent
```

### misskeyのモニタリング追加
```shell
echo 'check process misskey
      matching "misskey/docker-compose.yml"
      start program = "/usr/bin/systemctl start misskey.service"
      stop program = "/usr/bin/systemctl stop misskey.service"
      if 5 restarts within 5 cycles then alert
      if failed port 3000 protocol http with timeout 10 seconds then restart' | sudo tee /etc/monit/conf.d/misskey
```

```
$ sudo systemctl restart monit
$ sudo systemctl status monit
```