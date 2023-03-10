import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/misskey-memo/",

  locales: {
    "/": {
      lang: "ja-JP",
      title: "Misskey構築/運用メモ",
      description: "Misskeyの構築・運用時のメモ",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
