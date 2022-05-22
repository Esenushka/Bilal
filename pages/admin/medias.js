import Head from 'next/head'
import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import Media from '../../components/common/media/Media'

export default function Medias({props}) {
  return (
    <div>
      <Head>
        <title>
          Контакты
        </title>
        <link rel="icon" href="/b2.png" />
      </Head>
        <AdminNavBar {...props}/>
        <Media/>
    </div>
  )
}
