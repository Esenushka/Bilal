import Head from 'next/head'
import AdminNavBar from '../../components/common/AdminNavBar/AdminNavBar'
import KyrsEdit from '../../components/common/KyrsEdit/KyrsEdit'

export default function Dashboard(props) {
  return (
    <div>
      <Head>
          <title>Курсы</title>
        <link rel="icon" href="/b2.svg" />
      </Head>
      <AdminNavBar {...props}/>
      <KyrsEdit/>
    </div>
  )
}
