import{_ as s,W as e,X as n,Y as a}from"./framework-3a42445a.js";const i={},t=a(`<p>プロセスの監視・再起動を行う為、monitを導入して監視・再起動処理を定義する。</p><h2 id="monitのインストール" tabindex="-1"><a class="header-anchor" href="#monitのインストール" aria-hidden="true">#</a> Monitのインストール</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> monit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="monitの設定" tabindex="-1"><a class="header-anchor" href="#monitの設定" aria-hidden="true">#</a> Monitの設定</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;set daemon  120
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
include /etc/monit/conf-enabled/*&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/monitrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sshdのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#sshdのモニタリング追加" aria-hidden="true">#</a> sshdのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;sshd: 127.0.0.1&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> /etc/hosts.allow
<span class="token builtin class-name">echo</span> <span class="token string">&#39;check process sshd
      with pidfile &quot;/var/run/sshd.pid&quot;
      start program = &quot;/usr/bin/systemctl start sshd.service&quot;
      stop program = &quot;/usr/bin/systemctl stop sshd.service&quot;
      if 5 restarts within 5 cycles then alert
      if failed port 22 protocol ssh with timeout 10 seconds then restart&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/sshd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="crondのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#crondのモニタリング追加" aria-hidden="true">#</a> crondのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process crond
      with pidfile &quot;/var/run/crond.pid&quot;
      start program = &quot;/usr/bin/systemctl start cron.service&quot;
      stop program = &quot;/usr/bin/systemctl stop cron.service&quot;
      if 5 restarts within 5 cycles then alert&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/crond
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="chronyのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#chronyのモニタリング追加" aria-hidden="true">#</a> chronyのモニタリング追加</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process chronyd
      with pidfile &quot;/var/run/chrony/chronyd.pid&quot;
      start program = &quot;/usr/bin/systemctl start chrony.service&quot;
      stop program = &quot;/usr/bin/systemctl stop chrony.service&quot;
      if 5 restarts within 5 cycles then alert&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/chronyd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tailscaledのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#tailscaledのモニタリング追加" aria-hidden="true">#</a> tailscaledのモニタリング追加</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process tailscaled
      matching &quot;tailscaled&quot;
      start program = &quot;/usr/bin/systemctl start tailscaled.service&quot;
      stop program = &quot;/usr/bin/systemctl stop tailscaled.service&quot;
      if 5 restarts within 5 cycles then alert
      if failed unixsocket /var/run/tailscale/tailscaled.sock with timeout 10 seconds then restart&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/tailscaled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dockerのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#dockerのモニタリング追加" aria-hidden="true">#</a> dockerのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process docker
      with pidfile &quot;/var/run/docker.pid&quot;
      start program = &quot;/usr/bin/systemctl start docker.service&quot;
      stop program = &quot;/usr/bin/systemctl stop docker.service&quot;
      if 5 restarts within 5 cycles then alert
      if failed unixsocket /run/containerd/containerd.sock with timeout 10 seconds then restart&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginxのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#nginxのモニタリング追加" aria-hidden="true">#</a> nginxのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process nginx
      with pidfile &quot;/var/run/nginx.pid&quot;
      start program = &quot;/usr/bin/systemctl start nginx.service&quot;
      stop program = &quot;/usr/bin/systemctl stop nginx.service&quot;
      if 5 restarts within 5 cycles then alert
      if failed port 80 protocol http with timeout 10 seconds then restart
      if failed port 443 protocol https with timeout 10 seconds then restart&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mackerel-agentのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#mackerel-agentのモニタリング追加" aria-hidden="true">#</a> mackerel-agentのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process mackerel-agent
      with pidfile &quot;/var/run/mackerel-agent.pid&quot;
      start program = &quot;/usr/bin/systemctl start mackerel-agent.service&quot;
      stop program = &quot;/usr/bin/systemctl stop mackerel-agent.service&quot;
      if 5 restarts within 5 cycles then alert&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/mackerel-agent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="misskeyのモニタリング追加" tabindex="-1"><a class="header-anchor" href="#misskeyのモニタリング追加" aria-hidden="true">#</a> misskeyのモニタリング追加</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;check process misskey
      matching &quot;misskey/docker-compose.yml&quot;
      start program = &quot;/usr/bin/systemctl start misskey.service&quot;
      stop program = &quot;/usr/bin/systemctl stop misskey.service&quot;
      if 5 restarts within 5 cycles then alert
      if failed port 3000 protocol http with timeout 10 seconds then restart&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/monit/conf.d/misskey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ sudo systemctl restart monit
$ sudo systemctl status monit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,22),r=[t];function c(l,d){return e(),n("div",null,r)}const u=s(i,[["render",c],["__file","monit.html.vue"]]);export{u as default};
