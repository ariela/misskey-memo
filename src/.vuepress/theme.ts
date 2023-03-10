import { hopeTheme } from "vuepress-theme-hope";
import { sidebar } from "vuepress-theme-hope";
import { navbar } from "vuepress-theme-hope";

export default hopeTheme({

  author: {
    name: "yuki@ariela",
    url: "https://misskey.io/ariela",
  },

  iconAssets: "fontawesome",

  logo: "/logo.png",

  repo: "ariela/misskey-memo",

  docsDir: "src",

  editLink: false,
  navbar: navbar([
    
  ]),
  sidebar: sidebar({
    "/": [
      "",
      {
        icon: "server",
        text: "サーバー構築",
        prefix: "server/",
        link: "server/",
        children: "structure",
      },
      {
        icon: "desktop",
        text: "Misskey構築",
        prefix: "misskey/",
        link: "misskey/",
        children: "structure",
      },
      {
        icon: "square-plus",
        text: "追加構築",
        prefix: "additional/",
        link: "additional/",
        children: "structure",
      },
      {
        icon: "gear",
        text: "設定",
        prefix: "configuration/",
        link: "configuration/",
        children: "structure",
      },
      {
        icon: "robot",
        text: "運用",
        prefix: "operation/",
        link: "operation/",
        children: "structure",
      },
    ],
  }),
  pageInfo: ["Category", "Tag"],

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
