import React from 'react';
import BlogCard from '../common/BlogCard/BlogCard';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase.js';
import Preloader from '../common/Preloader/Preloader';

export default function BlogPage() {
  const[blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.collection("blog")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const blogs = []
        snapshot.forEach((doc) => {
          blogs.push({ ...doc.data(), id: doc.id })
        })
        setBlog(blogs)
      })
  }, [])

  if(isLoading){
    return <Preloader full/>
  }

  return (
    <div className="container">
      <div className="block-top blog_block-top">
        <div>Блог</div>
        <div>Статьи, интервью и заметки об анимации</div>
      </div>

      <div className="kyrs-cards_wrapper">
        {

          blog.map((el) =>

            <BlogCard key={el.id} {...el} />
          )

        }
      </div>
      <br />
    </div>
  );
}
