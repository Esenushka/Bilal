import React from 'react';
import Image from 'next/image';

export default function BlogCard({ imgUrl, title, des, id }) {
  return (
    <div className="blog-card">
      <Image unoptimized  width={550} height={220} src={imgUrl} alt={title} />
      <div className="blog-text">
        <div>{title}</div>
        <div>{des}</div>
      </div>
    </div>
  );
}
