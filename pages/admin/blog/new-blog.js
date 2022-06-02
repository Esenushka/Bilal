import Head from "next/head"
import NewBlog from '../../../components/common/BlogEdit/NewBlog'

export default function newblog() {
  return (
    <div>
      <Head>
        <title>Новая Статья</title>
        <link rel='icon' href='/b2.svg' />
      </Head>
      <NewBlog />
    </div>
  )
}
