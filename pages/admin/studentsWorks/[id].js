import StudentsEdit from "../../../components/common/studentsEdit/studentsEdit";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";
import Head from "next/head"

export default function StudentsWork() {
    const [id, setId] = useState([])
    const [directionCardList,setDirectionCardList] = useState([])

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const idData = []
                const direction = []
                snapshot.forEach((doc) => {
                    idData.push(doc.id)
                    direction.push({...doc.data()})
                })
                setId(idData)
                setDirectionCardList(direction)
            })
    }, []);

    return (
        <div>
            <Head>
                <title>Изменение работы студента</title>
                <link rel="icon" href="/b2.png" />

            </Head>
            <StudentsEdit idData={id} directionCardList={directionCardList}  />
        </div>
    )
}
