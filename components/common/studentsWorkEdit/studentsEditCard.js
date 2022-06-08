import Image from "next/image"
import { db } from '../../../config/firebase'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from "next/link"

export default function StudentsEditCard({ id, direction }) {
    const [studentsWork, setStudentsWork] = useState([])
    useEffect(() => {
        db.collection("directionCardList/" + id + "/studentWork")
            .get()
            .then((snapshot) => {
                const students = []
                snapshot.forEach((doc) => {
                    students.push({ ...doc.data(), id: doc.id })
                })
                setStudentsWork(students)
            })
    }, [id])
    return (
        <div>
            
            <div className="direction-title">{direction}</div>
            
            <div className='response-students'>
                <Link href={"/admin/studentsWorks/newStudentWork?" + id} >
                    <a className="students-work students-add">
                        <Image loading="eager" unoptimized width={300} height={450} src={"/add.png"} alt={"add"} />
                    </a>

                </Link>
                {studentsWork.map((el) => (
                    <Link href={"/admin/studentsWorks/" + el.id} key={el.id}>
                        <a className="students-work">
                            <Image loading="eager" unoptimized width={300} height={450} src={el.url} alt={el.name} />
                        </a>
                    </Link>
                ))}
             
            </div>
        </div>
    )
}
