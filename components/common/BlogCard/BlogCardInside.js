import Image from "next/image"
import { db } from '../../../config/firebase.js';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import Preloader from '../Preloader/Preloader.js';

export default function BlogCardInside() {
  const [blog, setBlog] = useState({})
  const [isLoading,setIsLoading] = useState(true)

  const rout = useRouter()
  const id = rout.query.id

  useEffect(() => {
    db.collection("blog")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        snapshot.forEach((doc) => {
          if (doc.id === id) {
            setBlog({ ...doc.data(), id: doc.id })
          }
        })
      })
  }, [id]);

  if(isLoading){
    return <Preloader full/>
  }

  return (
    <div>
      <div className="container blog-container">
        <div className=" post-block-top">
          <div className="block-top">
            <h2>{blog.title}</h2>
          </div>
          <div className="post-img">
            <Image unoptimized width={1000} height={1000} src={blog.titleImg || "/file-image.png"} alt="Post image" />
          </div>
        </div>
      </div>
      <div className="container blog-container">
        <div className='post-content'>
          <div className='blog-date'>
            {
              blog.date
            }
          </div>
          <div className='blog-text_wrapper'>
            <div  className='blog-text'>
                  {blog.FirstText}
              </div>
            
          </div>
          <div className='blog-img_main'>
            <Image unoptimized width={1000} height={1000} src={blog.MainImg || "/file-image.png"} alt="Post image" />
          </div>
          <div className='blog-text_wrapper'>
            <div className="blog-text">
                {
                  blog.SecondText
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
