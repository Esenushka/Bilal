import Head from "next/head"
import KyrsEditCard from '../../../components/common/KyrsEditCard/KyrsEditCard'

export default function EditKyrs() {

    return (
        <div>
            <Head>
                <title>Изменение курса</title>
                <link rel='icon' href='/b2.svg' />
            </Head>
            <KyrsEditCard />
        </div>
    )
}
