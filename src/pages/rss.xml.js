import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog', ({ id }) => id.startsWith('ru/'));
  return rss({
    title: 'Rerowros | Engineering Log',
    description: 'Заметки о сетях, архитектуре и веб-разработке',
    site: context.site,
    xmlns: {
      yandex: 'http://news.yandex.ru',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.excerpt,
      link: `/blog/${post.slug.replace(/^ru\//, '')}/`,
      content: post.data.tldr
        ? `<p><strong>TL;DR:</strong> ${post.data.tldr}</p><p>${post.data.excerpt}</p>`
        : post.data.excerpt,
      customData: `<yandex:genre>article</yandex:genre>`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}
