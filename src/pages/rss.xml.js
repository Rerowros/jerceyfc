import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Jersey | Engineering Log',
    description: 'Заметки о сетях, архитектуре и веб-разработке',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title.ru,
      pubDate: post.data.pubDate,
      description: post.data.excerpt.ru,
      // Ссылка на статью
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}
