import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogCard({ imgUrl, title, des, id }) {
  const router = useRouter();

  return (
    <Link href={`/post/${id}`}>
      <a>
        <div className="blog-card">
          <Image unoptimized width={550} height={220} src={imgUrl} alt={title} />
          <div className="blog-text">
            <div>{title}</div>
            <div>{des}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
