import { defineConfig } from 'vitepress';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { SitemapStream } from 'sitemap';

const BASE_URL = process.env.BASE_URL || '/';
const PROD_BASE_URL = 'https://automatisch.io/docs';
const LINKS = [];

export default defineConfig({
  base: BASE_URL,
  lang: 'en-US',
  title: 'Automatisch Docs',
  description:
    'Build workflow automation without spending time and money. No code is required.',
  cleanUrls: 'with-subfolders',
  ignoreDeadLinks: true,
  themeConfig: {
    siteTitle: 'Automatisch',
    nav: [
      {
        text: 'Guide',
        link: '/',
        activeMatch: '^/$|^/guide/',
      },
      {
        text: 'Apps',
        link: '/apps/carbone/connection',
        activeMatch: '/apps/',
      },
    ],
    sidebar: {
      '/apps/': [
        // ... sidebar configuration ...
      ],
      '/': [
        // ... sidebar configuration ...
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/automatisch/automatisch' },
      { icon: 'twitter', link: 'https://twitter.com/automatischio' },
      { icon: 'discord', link: 'https://discord.gg/dJSah9CVrC' },
    ],
    editLink: {
      pattern:
        'https://github.com/automatisch/automatisch/edit/main/packages/docs/pages/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      copyright: 'Copyright © 2022 Automatisch. All rights reserved.',
    },
    algolia: {
      appId: 'I7I8MRYC3P',
      apiKey: '9325eb970bdd6a70b1e35528b39ed2fe',
      indexName: 'automatisch',
    },
  },

  async transformHead(ctx) {
    if (ctx.pageData.relativePath === '404.html') return; // Skip 
