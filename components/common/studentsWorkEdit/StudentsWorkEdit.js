import { useEffect, useState } from 'react'
import { db } from '../../../config/firebase'
import StudentsEditCard from './studentsEditCard'
import Preloader from '../Preloader/Preloader'
import { useRouter } from "next/router"
import Link from 'next/link';


export default function StudentsWorkEdit() {
  const [studentsWork, setStudentsWork] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const students = []
        snapshot.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id })
        })
        setStudentsWork(students)
      })
  }, [])


  const router = useRouter()
  const query = Object.keys(router.query)[0]

  if (isLoading) {
    return <Preloader full />
  }

  const Joined = (
    studentsWork.map((el) =>
      query === undefined ? <StudentsEditCard {...el} /> : (el.urlDirection === query ? <StudentsEditCard {...el} /> : "")
    )
  ).join("")

  return (
    <div className='students-edit-wrapper'>
      <div className="kyrs-filter">
        {
          studentsWork.map((el) => el.notStudents ? "" : <Link key={el.id} href={router.pathname + "?" + el.urlDirection}>
            <a className={query === el.urlDirection ? "active" : ""}>
              {el.direction}
            </a>
          </Link>)
        }
        <Link href="/admin/studentsWorks" >
          <a className={query === undefined ? "active" : ""}>
            Все
          </a>
        </Link>
      </div>
      <div className="kyrs-cards_wrapper students_wrapper">
        {
          Joined ? (
            studentsWork.map((el) =>
              el.notStudents ? "" : query === undefined ? <StudentsEditCard key={el.id} {...el} /> : (el.urlDirection === query ? <StudentsEditCard {...el} /> : "")
            )
          ) : <div className="nothing">
            Такого напровления пока нет!
          </div>
        }

      </div>
      
    </div>
  )
}
