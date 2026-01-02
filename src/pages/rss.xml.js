import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
// Добавляем sanitize-html для очистки контента перед вставкой в RSS
import sanitizeHtml from 'sanitize-html';
// Вам может понадобиться Markdown парсер, если excerpt хранит MD,
// но лучше брать скомпилированный HTML из post.render(), если это возможно в RSS в Astro,
// либо просто отдавать более подробное описание.

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Rerowros | Engineering Log',
    description: 'Заметки о сетях, архитектуре и веб-разработке',
    site: context.site,
    // Добавляем пространство имен для Яндекса (опционально, но полезно)
    xmlns: {
      yandex: 'http://news.yandex.ru',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: blog.map((post) => ({
      title: post.data.title.ru,
      pubDate: post.data.pubDate,
      description: post.data.excerpt.ru,
      link: `/blog/${post.slug}/`,
      // ВАЖНО: Добавляем content, чтобы Яндекс лучше понимал о чем статья, не заходя на сайт
      // Если у вас нет html, используйте хотя бы tldr
      content: post.data.tldr?.ru
        ? `<p><strong>TL;DR:</strong> ${post.data.tldr.ru}</p><p>${post.data.excerpt.ru}</p>`
        : post.data.excerpt.ru,
      customData: `<yandex:genre>article</yandex:genre>`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}
