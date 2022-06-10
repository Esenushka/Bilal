import NewStudentWork from "../../../components/common/newStudentWork/NewStudentWork";
import Head from "next/head"

export default function StudentsWork() {
    return (
        <div>
            <Head>
                <title>
                    Новая работа студента
                </title>
                <link rel="icon" href="/b2.png" />

            </Head>
            <NewStudentWork  />
        </div>
    )
}
