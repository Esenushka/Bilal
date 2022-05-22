import React from 'react'
import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import StudentsWorkEdit from '../../components/common/studentsWorkEdit/StudentsWorkEdit'
import Head from "next/head"

export default function StudentsWorks({ props }) {

  return (
    <div>
      <Head>
        <title>Работы студентов</title>
        <link rel="icon" href="/b2.png" />

      </Head>
      <AdminNavBar {...props} />
      <StudentsWorkEdit />
    </div>
  )
}
