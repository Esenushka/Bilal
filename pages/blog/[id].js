import BlogCardInside from '../../components/common/BlogCard/BlogCardInside.js';
import { useState, useEffect } from 'react';
import { blogArticlesList } from '../../components/constants/blogArticlesList.js';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function KyrsCard() {
  const [data, setData] = useState({});
  const router = useRouter();
  const id = router.query?.id || 0;
  useEffect(() => {
    blogArticlesList.forEach((el) => (el.id == id ? setData(el) : false));
  }, [id]);
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <link rel='icon' href='/b2.svg'/>
      </Head>
      <BlogCardInside {...data} />
    </div>
  );
}
