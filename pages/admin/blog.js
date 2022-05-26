import React from 'react'
import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import BlogEdit from '../../components/common/BlogEdit/BlogEdit'

export default function Blog({props}) {
  return (
    <div>
        <AdminNavBar {...props}/>
        <BlogEdit/>
    </div>
  )
}
