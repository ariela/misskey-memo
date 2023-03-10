---
title: 画像をCLI表示出来る様に設定する
icon: apple-alt
order: 2
tag:
    - macOS
    - iTerm2
---

::: note
macOSのiTerm2にて利用出来る機能を使用しています。他の環境下ではこの内容通りでは画像表示できません。
:::

## サーバー上で画像表示できるようにする
macOSのiTerm2ではコマンドをサーバーに配置しておくことで画像をターミナル上で表示が可能となるため、設定を行う。

[Inline Images Protocol](https://iterm2.com/documentation-images.html)と呼ばれる仕組みが実装されており、その中でも `imgcat` を使用すると指定したファイルの内容を表示する事が出来るのでサーバー上で確認を行いたい場合に便利である。

```shell
sudo curl -o /usr/local/bin/imgcat https://iterm2.com/utilities/imgcat
sudo chmod +x /usr/local/bin/imgcat
```
