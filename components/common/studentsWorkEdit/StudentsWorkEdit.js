import { useEffect, useState } from 'react'
import { db } from '../../../config/firebase'
import { useRouter } from "next/router"
import StudentsEditCard from './studentsEditCard'
import Preloader from '../Preloader/Preloader'

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

  if (isLoading) {
    return <Preloader full />
  }

  return (
    <div className='students-edit-wrapper'>
      <div className="kyrs-cards_wrapper students_wrapper">
        {
          studentsWork.map((el) => <StudentsEditCard key={el.id} direction={el.direction} id={el.id} />)
        }
      </div>
    </div>
  )
}
