import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Rerowros | Engineering Log',
    description: 'Заметки о сетях, архитектуре и веб-разработке',
    site: context.site,
    xmlns: {
      yandex: 'http://news.yandex.ru',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: blog.map((post) => ({
      title: post.data.title.ru,
      pubDate: post.data.pubDate,
      description: post.data.excerpt.ru,
      link: `/blog/${post.slug}/`,
      content: post.data.tldr?.ru
        ? `<p><strong>TL;DR:</strong> ${post.data.tldr.ru}</p><p>${post.data.excerpt.ru}</p>`
        : post.data.excerpt.ru,
      customData: `<yandex:genre>article</yandex:genre>`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}
