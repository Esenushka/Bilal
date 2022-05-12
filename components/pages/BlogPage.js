import React from 'react';
import { blogDirectionList } from '../constants/blogDirectionList';
import { blogArticlesList } from '../constants/blogArticlesList.js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BlogCard from '../common/BlogCard/BlogCard';

export default function BlogPage() {
  const router = useRouter();
  const query = Object.keys(router.query)[0];
  const Joined = blogArticlesList.map((el) =>
    query === undefined ? <BlogCard {...el} /> :
      el.directions.map((item) => item === query ? <BlogCard {...el} /> : '')
  ).join("").replace(/,/g, '')
  return (
    <div className="container">
      <div className="block-top blog_block-top">
        <div>Блог</div>
        <div>Статьи, интервью и заметки об анимации</div>
      </div>
      <div className="kyrs-filter">
        <Link href="/blog">
          <a className={query === undefined ? 'active' : ''}>Все</a>
        </Link>
        {blogDirectionList.map((el) => (
          <Link key={el.id} href={router.pathname + '?' + el.urlDirection}>
            <a className={query === el.urlDirection ? 'active' : ''}>{el.direction}</a>
          </Link>
        ))}
      </div>
      <div className="kyrs-cards_wrapper">
        {
          Joined ? (
            blogArticlesList.map((el) =>
              query === undefined ? (
                <BlogCard key={el.id} {...el} />
              ) : (
                el.directions.map((item) => (item === query ? <BlogCard key={el.id} {...el} /> : ''))
              )
            )
          ) : (
            <div className="nothing">Такой статьи пока нет!</div>
          )
        }
      </div>
      <br />
    </div>
  );
}
