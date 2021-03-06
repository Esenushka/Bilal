import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogCard({ titleImg, title, id,more }) {
  const router = useRouter();

  return (
    <Link href={router.pathname === "/admin/blog" ? `/admin/blog/${id}` : `/blog/${id}`}>
      <a>
        <div className="blog-card">
          <Image loading="eager" unoptimized width={550} height={220} src={titleImg || "/file-image.png"} alt={title} />
          <div className="blog_text">
            <div>{title}</div>
            <div>{more.find((el) => el.text)?.text}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
