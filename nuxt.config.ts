import { Configuration } from '@nuxt/types';
import fg from 'fast-glob';
import { getFeedPosts } from './app/store/feed';
import settings from './app/content/settings/general.json';
import manifest from './app/content/settings/manifest.json';

const nuxtConfig: Configuration = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s ${settings.titleTemplate}`,
    title: settings.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: settings.seoDescription },
      {
        hid: 'og:title',
        property: 'og:title',
        content: `${settings.title} ${settings.titleTemplate}`,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: settings.seoDescription,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: settings.seoMetaImage,
      },
    ],
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
        defer: true,
      },
    ],
    link: [
      {
        rel: 'preconnect',
        href: 'https://d33wubrfki0l68.cloudfront.net',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Oswald&display=swap',
      },
    ],
  },

  srcDir: 'app/',

  /*
   ** Customize the progress-bar color
   */
  loading: { color: settings.loadingColor },

  /*
   ** Global CSS
   */
  css: ['~assets/css/main.scss'],

  styleResources: {
    scss: ['~assets/css/_variables.scss', '~assets/css/_mixins.scss'],
  },

  generate: {
    subFolders: false,

    routes: [
      ...fg.sync(['./app/content/blog/**.json', './app/content/pages/**.json']).map(url => ({
        route: url.replace(/^.\/app\/content(\/pages)?|.json$/gi, ''),
        payload: require(url),
      })),
    ],
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/feed'
  ],

  purgeCSS: {
    whitelist: [/.*/],
    enabled: false,
  },

  robots: {
    UserAgent: '*',
    Disallow: '',
    SiteMap: '/sitemap.xml'
  },

  feed: [
    // A default feed configuration object
    {
      path: '/feed', // The route to your feed.
      async create(feed) {
        feed.options = {
          title: 'Guido van Tricht',
          link: 'https://guidovtricht.nl/',
          description: '',
          generator: null,
          language: 'en-US',
        };
        const posts = getFeedPosts();
        posts.forEach(post => {
          feed.addItem({
            title: post.newTitle,
            date: new Date(post.publishedAt),
            description: post.excerpt,
            id: post.url,
            link: post.url,
            content: post.content,
          });
        });
      },
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
    },
  ],

  markdownit: {
    preset: 'default',

    injected: true,

    // Convert '\n' in paragraphs into <br>
    breaks: true,

    // Enable HTML tags in source
    html: true,

    // Enable some language-neutral replacement + quotes beautification
    typographer: true,

    highlight: function(str, lang) {
      const hljs = require('highlight.js');
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return ''; // use external default escaping
    },
  },

  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://d33wubrfki0l68.cloudfront.net/.*',
        handler: 'cacheFirst',
      },
    ],
  },

  pwa: {
    icon: {
      iconSrc: `app/static${settings.icon}`,
    },
  },

  sitemap: {
    hostname: "https://guidovtricht.nl",
    gzip: true,
    exclude: ['/secret', '/admin/**'],
  },

  manifest: {
    name: manifest.name,
    short_name: manifest.shortName,
    description: manifest.description,
    theme_color: manifest.themeColor,
    background_color: manifest.backgroundColor,
    lang: manifest.lang || 'en',
  },

  meta: {
    ogTitle: false,
    ogDescription: false,
  },

  // Serve both, the modern bundle <script type="module"> and the legacy bundle <script nomodule> scripts,
  // also provide a <link rel="modulepreload"> for the modern bundle.
  // Every browser that understands the module type will load the modern bundle while older browsers fall back to the legacy (transpiled) one.
  ...(process.env.NODE_ENV === 'production' && {
    modern: 'client',
  }),

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: false,
        ignoreNotFoundWarnings: true,
      },
    ],
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  build: {
    html: {
      minify: {
        removeOptionalTags: false,
        collapseWhitespace: true,
        decodeEntities: true,

        // CSS & JS are already optimised with TerserWebpack & OptimizeCSSAssetsPlugin
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },

    publicPath: process.env.npm_lifecycle_event === 'generate' ? '/pwa/' : '/_nuxt/',

    devtools: process.env.NODE_ENV !== 'production',

    optimization: {
      splitChunks: {
        name: true,
      },
      runtimeChunk: true,
    },

    // Split chunks
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    parallel: process.env.NODE_ENV !== 'production',

    extractCSS: process.env.NODE_ENV === 'production',

    // Extend webpack config
    extend(config, { isDev }): void {
      config.devtool = isDev ? 'eval-source-map' : false;
      config.node = {
        fs: 'empty',
      };
    },
  },
};

export default nuxtConfig;
