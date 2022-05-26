import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogCard({ MainImg, title, FirstText, id }) {
  const router = useRouter();

  return (
    <Link href={router.pathname === "/admin/blog" ? `/admin/blog/${id}` : `/blog/${id}`}>
      <a>
        <div className="blog-card">
          <Image unoptimized width={550} height={220} src={MainImg || "/file-image.png"} alt={title} />
          <div className="blog_text">
            <div>{title}</div>
            <div>{FirstText}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
