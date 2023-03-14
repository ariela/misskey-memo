import{_ as l,W as c,X as d,Z as s,$ as e,a0 as a,Y as i,D as r}from"./framework-1800c995.js";const o={},t={href:"https://misskey-hub.net/docs/install.html",target:"_blank",rel:"noopener noreferrer"},p=s("h2",{id:"方針",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#方針","aria-hidden":"true"},"#"),e(" 方針")],-1),v={href:"https://hub.docker.com/r/misskey/misskey",target:"_blank",rel:"noopener noreferrer"},m=i(`<h2 id="準備" tabindex="-1"><a class="header-anchor" href="#準備" aria-hidden="true">#</a> 準備</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/services/misskey/.config
$ <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> <span class="token variable">\${<span class="token environment constant">USER</span>}</span>:docker /opt/services
$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> /opt/services ~/services
$ <span class="token builtin class-name">cd</span> ~/misskey
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose-yml-の作成" tabindex="-1"><a class="header-anchor" href="#docker-compose-yml-の作成" aria-hidden="true">#</a> docker-compose.yml の作成</h2>`,3),u={href:"https://github.com/misskey-dev/misskey/blob/develop/docker-compose.yml.example",target:"_blank",rel:"noopener noreferrer"},k=i(`<p>下記内容ではファイルをオブジェクトストレージに保存し、Redisの設定を変更出来るように修正しています。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-o</span> docker-compose.yml https://raw.githubusercontent.com/misskey-dev/misskey/develop/docker-compose.yml.example
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-diff line-numbers-mode" data-ext="diff"><pre class="language-diff"><code><span class="token coord">@@ -19,16 +19,17 @@</span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">      - internal_network
</span><span class="token prefix unchanged"> </span><span class="token line">      - external_network
</span><span class="token prefix unchanged"> </span><span class="token line">    volumes:
</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">      - ./files:/misskey/files
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">      - ./.config:/misskey/.config:ro
</span></span>
<span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">  redis:
</span><span class="token prefix unchanged"> </span><span class="token line">    restart: always
</span><span class="token prefix unchanged"> </span><span class="token line">    image: redis:7-alpine
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">    command: &quot;redis-server /etc/redis.conf&quot;
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">    networks:
</span><span class="token prefix unchanged"> </span><span class="token line">      - internal_network
</span><span class="token prefix unchanged"> </span><span class="token line">    volumes:
</span><span class="token prefix unchanged"> </span><span class="token line">      - ./redis:/data
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">      - ./.config/redis.conf:/etc/redis.conf
</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line">    healthcheck:
</span><span class="token prefix unchanged"> </span><span class="token line">      test: &quot;redis-cli ping&quot;
</span><span class="token prefix unchanged"> </span><span class="token line">      interval: 5s
</span></span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dockerfileの作成" tabindex="-1"><a class="header-anchor" href="#dockerfileの作成" aria-hidden="true">#</a> Dockerfileの作成</h2><p>アイコンの置き換えを行うので、ファイルをコンテナイメージへ入れれるようにDockerfileを作成します。 変更を行う必要が無ければ <code>docker-compose.yml</code> の <code>web</code> で使用するイメージを <code>build: .</code> を <code>image: misskey/misskey</code> などに指定するだけでも対応可能です。</p><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM misskey/misskey:13.9
COPY --chown=misskey:misskey . ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="各種設定ファイルの作成" tabindex="-1"><a class="header-anchor" href="#各種設定ファイルの作成" aria-hidden="true">#</a> 各種設定ファイルの作成</h2><p><code>default.yml</code>と<code>docker.env</code>を用意します。内容については各環境に応じて変わるので割愛します。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-o</span> .config/default.yml https://raw.githubusercontent.com/misskey-dev/misskey/develop/.config/docker_example.yml
$ <span class="token function">curl</span> <span class="token parameter variable">-o</span> .config/docker.env https://raw.githubusercontent.com/misskey-dev/misskey/develop/.config/docker_example.env

$ <span class="token function">vi</span> .config/default.yml
$ <span class="token function">vi</span> .config/docker.env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>redis.conf</code> は基本的な設定のみやっています。状況に応じてチューニングを行う場合はあります。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize no
activedefrag yes
# active-defrag-ignore-bytes 100mb
# active-defrag-threshold-lower 10
# active-defrag-threshold-upper 100
# active-defrag-cycle-min 1
# active-defrag-cycle-max 25
# active-defrag-max-scan-fields 1000&#39;</span> <span class="token operator">|</span> <span class="token function">tee</span> .config/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="サービス化する" tabindex="-1"><a class="header-anchor" href="#サービス化する" aria-hidden="true">#</a> サービス化する</h2><p>systemctlでサービス停止/起動を行うなうため、サービス化を行います。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;[Unit]
Description=Misskey by docker-compose
Requires=docker.service

[Service]
Type=simple

Environment=COMPOSE_FILE=/opt/services/misskey/docker-compose.yml

ExecStart=/usr/bin/docker compose -f \${COMPOSE_FILE} up
ExecStop=/usr/bin/docker compose -f \${COMPOSE_FILE} stop 

[Install]
WantedBy=multi-user.target&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /lib/systemd/system/misskey.service
$ <span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /lib/systemd/system/misskey.service /etc/systemd/system/misskey.service
$ <span class="token function">sudo</span> systemctl daemon-reload

$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> misskey.service
$ <span class="token function">sudo</span> systemctl start misskey.service
$ <span class="token function">sudo</span> systemctl status misskey.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function b(h,f){const n=r("ExternalLinkIcon");return c(),d("div",null,[s("p",null,[s("a",t,[e("ドキュメント"),a(n)]),e("とは異なる手法でデプロイを行います。")]),p,s("p",null,[s("a",v,[e("DockerHub"),a(n)]),e("にて恐らく公式のイメージがアップロードされているため、このイメージを使用してdocker-composeによる実行の方式で作成します。")]),m,s("p",null,[e("公式の"),s("a",u,[e("docker-compose.yml.example"),a(n)]),e("を使用して作成します。")]),k])}const y=l(o,[["render",b],["__file","provision.html.vue"]]);export{y as default};
