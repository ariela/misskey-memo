---
title: cloud-initの設定調整
order: 3
tag:
    - vultr
---
Vultrでデフォルトだとcloud-initの設定がセキュリティ的によろしくないので、修正を行っておく。

> 先にユーザによるSSH鍵認証の設定を行っておかないとログイン出来なくなるので注意。

```shell
$ sudo sed -E -i 's/^disable_root:(.*)/disable_root: true/g' /etc/cloud/cloud.cfg
$ sudo sed -E -i 's/^ssh_pwauth:(.*)/ssh_pwauth: 0/g' /etc/cloud/cloud.cfg

$ diff -u cloud.cfg cloud.cfg.orig
--- cloud.cfg	2023-03-13 09:25:49.572797452 +0000
+++ cloud.cfg.orig	2023-03-13 09:21:51.406078530 +0000
@@ -1,7 +1,7 @@
-disable_root: true
+disable_root: false
 mount_default_fields: [~, ~, 'auto', 'defaults,nofail', '0', '2']
 resize_rootfs_tmp: /dev
-ssh_pwauth: 0
+ssh_pwauth: 1
 preserve_hostname: false

 datasource_list:
```