import Head from "next/head"
import NewKyrs from '../../../components/common/newKyrs/newKyrs'

export default function newKyrs() {
  return (
    <div>
      <Head>
        <title>Новый курс</title>
        <link rel='icon' href='/b2.png' />
      </Head>
      <NewKyrs />
    </div>
  )
}
