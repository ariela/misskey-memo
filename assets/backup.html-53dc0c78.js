import{_ as s,W as e,X as n,Y as a}from"./framework-3a42445a.js";const i={},c=a(`<p>Misskeyはデータベースさえちゃんとバックアップが取れていると復旧が容易なのでバックアップを取得します。 一応日時バックアップとしていますが、ローテートさえちゃんと組んでしまえば時間とかでも良いかもしれません。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token string">&#39;#!/usr/bin/bash

MISSKEY_DIR=/opt/services/misskey
BACKUP_DIR=/home/user/backup
BACKUP_FILE_NAME=$(date +&quot;%Y%m%d%H%M%SZ&quot;).dump.xz

source \${MISSKEY_DIR}/.config/docker.env

cd \${MISSKEY_DIR}
docker compose exec db pg_dump --create --clean --if-exists -U \${POSTGRES_USER} \${POSTGRES_DB} | xz -9 -c &gt; \${BACKUP_DIR}/\${BACKUP_FILE_NAME}

cd \${BACKUP_DIR}
s3cmd put \${BACKUP_FILE_NAME} s3://misskey-backup
&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /usr/local/bin/misskey-db-backup
$ <span class="token function">sudo</span> <span class="token function">chmod</span> +x /usr/local/bin/misskey-db-backup
$ <span class="token function">crontab</span> <span class="token parameter variable">-e</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>00 18 * * * /usr/local/bin/misskey-db-backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3),d=[c];function l(t,r){return e(),n("div",null,d)}const o=s(i,[["render",l],["__file","backup.html.vue"]]);export{o as default};
