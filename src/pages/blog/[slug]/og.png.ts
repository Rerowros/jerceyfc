import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { post } = props;

  // 1. Читаем файл локально из папки public
  // process.cwd() указывает на корень проекта при запуске
  const fontPath = path.join(process.cwd(), 'public/fonts/Unbounded-Black.ttf');
  const fontData = fs.readFileSync(fontPath);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#03000a',
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(129, 140, 248, 0.2), transparent), radial-gradient(circle at 80% 90%, rgba(192, 132, 252, 0.1), transparent)',
          padding: '80px',
          fontFamily: 'Unbounded',
        },
        children: [
          // Декоративная линия
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '16px',
                background: '#818cf8',
              },
            },
          },
          // Подзаголовок
          {
            type: 'div',
            props: {
              style: {
                color: '#818cf8',
                fontSize: '32px',
                marginBottom: '24px',
                fontWeight: 600,
                letterSpacing: '0.05em',
              },
              children: 'REROWROS /// ENGINEERING LOG',
            },
          },
          {
            type: 'div',
            props: {
              style: {
                color: 'white',
                fontSize: '72px',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '48px',
                display: 'flex',
                flexWrap: 'wrap',
              },
              children: post.data.title.ru,
            },
          },
          // Теги
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              },
              children: (post.data.tags || []).slice(0, 4).map((tag: string) => ({
                type: 'div',
                props: {
                  style: {
                    backgroundColor: 'rgba(129, 140, 248, 0.15)',
                    border: '1px solid rgba(129, 140, 248, 0.3)',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    color: '#a5b4fc',
                    fontSize: '24px',
                    fontWeight: 500,
                  },
                  children: `#${tag}`,
                },
              })),
            },
          },
          // Футер
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                right: '60px',
                color: '#64748b',
                fontSize: '24px',
                fontWeight: 500,
              },
              children: 'rerowros.ru',
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Unbounded',
          data: fontData,
          weight: 900,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
