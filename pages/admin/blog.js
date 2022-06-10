import React from 'react'
import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import BlogEdit from '../../components/common/BlogEdit/BlogEdit'
import Head from "next/head"

export default function Blog({ props }) {
  return (
    <div>
      <Head>
        <title>Блог</title>
        <link rel='icon' href='/b2.png' />
      </Head>
      <AdminNavBar {...props} />
      <BlogEdit />
    </div>
  )
}
