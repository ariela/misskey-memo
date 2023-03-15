import{_ as s,W as n,X as a,Y as e}from"./framework-3a42445a.js";const l={},i=e(`<p>Vultrでデフォルトだとcloud-initの設定がセキュリティ的によろしくないので、修正を行っておく。</p><blockquote><p>先にユーザによるSSH鍵認証の設定を行っておかないとログイン出来なくなるので注意。</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^disable_root:(.*)/disable_root: true/g&#39;</span> /etc/cloud/cloud.cfg
$ <span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-E</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^ssh_pwauth:(.*)/ssh_pwauth: 0/g&#39;</span> /etc/cloud/cloud.cfg

$ <span class="token function">diff</span> <span class="token parameter variable">-u</span> cloud.cfg cloud.cfg.orig
--- cloud.cfg	<span class="token number">2023</span>-03-13 09:25:49.572797452 +0000
+++ cloud.cfg.orig	<span class="token number">2023</span>-03-13 09:21:51.406078530 +0000
@@ -1,7 +1,7 @@
-disable_root: <span class="token boolean">true</span>
+disable_root: <span class="token boolean">false</span>
 mount_default_fields: <span class="token punctuation">[</span>~, ~, <span class="token string">&#39;auto&#39;</span>, <span class="token string">&#39;defaults,nofail&#39;</span>, <span class="token string">&#39;0&#39;</span>, <span class="token string">&#39;2&#39;</span><span class="token punctuation">]</span>
 resize_rootfs_tmp: /dev
-ssh_pwauth: <span class="token number">0</span>
+ssh_pwauth: <span class="token number">1</span>
 preserve_hostname: <span class="token boolean">false</span>

 datasource_list:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[i];function c(o,d){return n(),a("div",null,t)}const r=s(l,[["render",c],["__file","cloud-init.html.vue"]]);export{r as default};
