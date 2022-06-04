import BlogCardInside from '../../components/common/BlogCard/BlogCardInside.js';
import { useState, useEffect } from 'react';
import { blogArticlesList } from '../../components/constants/blogArticlesList.js';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/common/Header/Header.js';

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
        <title>Блог</title>
        <link rel='icon' href='/b2.png'/>
      </Head>
      <Header />
      <BlogCardInside {...data} />
    </div>
  );
}
