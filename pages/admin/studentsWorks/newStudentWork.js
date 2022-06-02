import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import NewStudentWork from "../../../components/common/newStudentWork/NewStudentWork";
import Head from "next/head"

export default function StudentsWork() {
    const [id, setId] = useState([])

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const idData = []
                snapshot.forEach((doc) => {
                    idData.push(doc.id)
                })
                setId(idData)
            })
    }, []);

    return (
        <div>
            <Head>
                <title>
                    Новая работа студента
                </title>
                <link rel="icon" href="/b2.svg" />

            </Head>
            <NewStudentWork idData={id} />
        </div>
    )
}
