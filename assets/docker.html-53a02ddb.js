import{_ as s,W as e,X as n,Y as i}from"./framework-1800c995.js";const a={},c=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;[Unit]
Description=Misskey by docker-compose
Requires=docker.service

[Service]
Type=simple

Environment=COMPOSE_FILE=/home/yuki/misskey/docker-compose.yml

ExecStart=/usr/bin/docker compose -f \${COMPOSE_FILE} up
ExecStop=/usr/bin/docker compose -f \${COMPOSE_FILE} stop 

[Install]
WantedBy=multi-user.target&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /lib/systemd/system/misskey.service
$ <span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /lib/systemd/system/misskey.service /etc/systemd/system/misskey.service
$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> misskey.service
$ <span class="token function">sudo</span> systemctl status misskey.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),l=[c];function t(d,o){return e(),n("div",null,l)}const m=s(a,[["render",t],["__file","docker.html.vue"]]);export{m as default};
