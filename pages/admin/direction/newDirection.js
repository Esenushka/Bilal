import React from 'react'
import NewDirection from '../../../components/common/newDirection/newDirection'
import Head from "next/head"

export default function newDirection() {
  return (
    <div>
      <Head>
        <title>Дабовление напровления</title>
      </Head>
      <NewDirection />
    </div>
  )
}
