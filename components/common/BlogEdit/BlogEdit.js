import BlogCard from "../BlogCard/BlogCard";
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase.js';
import Preloader from "../Preloader/Preloader";
import Link from "next/link"
import Image from "next/image"


export default function BlogEdit() {
    const [blog, setBlog] = useState([])
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
      <div className="container blog-edit_wrapper">
          <div className="kyrs-cards_wrapper">
              {

                  blog.map((el) =>

                      <BlogCard key={el.id} {...el} />
                  )

              }
              <Link href={"/admin/blog/new-blog"}>
                  <a>
                      <div className="blog-card blog-add">
                          <Image unoptimized width={550} height={220} src={"/add.png"} alt={"add"} />
                      </div>
                  </a>
              </Link>
          </div>
      </div>
  )
}
