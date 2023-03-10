---
title: メール配信設定(SendGrid)
order: 1
---
## SendGridの設定
- Sender Authentication
-- Domain Authentication
--- Cloudflare
--- yes

![image](https://user-images.githubusercontent.com/31660/223614840-6edaf320-5f25-46cb-8eaf-cbaa85059357.png)

| 項目 | 設定値 |
|-----|-------|
| メールアドレス | 送信元メールアドレス |
| ホスト | smtp.sendgrid.net |
| ポート | 587 |
| ユーザー名 | apikey (※BASE64で入力するとエラーになる）|
| パスワード | SendGridのAPIキー (※BASE64で入力するとエラーになる）|
