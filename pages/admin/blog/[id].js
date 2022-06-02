import Head from "next/head"
import BlogEditCard from '../../../components/common/BlogEdit/BlogEditCard'

export default function blogEdit() {
  return (
    <div>
        <Head>
            <title>Изменение Статьи</title>
              <link rel='icon' href='/b2.png' />
        </Head>
       <BlogEditCard/> 
    </div>
  )
}
