import { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentsSlider from '../StudentsSlider/StudentsSlider.js';
import { db } from '../../../config/firebase';

export default function Lessons() {
  const [directionCardList, setDirectionCardList] = useState({})

  
  useEffect(() => {
    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        const direction = []
        snapshot.forEach((doc) => {
          direction.push({ ...doc.data(), id: doc.id })
        })
        setDirectionCardList(direction[0])
      })
  }, []);

  return (
    <div className="lessons_wrapper">
      
      <div className="direction-title">РАБОТЫ СТУДЕНТОВ</div>
      <div className="students_work_wrapper">
        <StudentsSlider home={true} id={directionCardList.id}/>
        <div className="btn_wrapper">
          <Link href={'/studentsworks'}>
            <button className="btn">СМОТРЕТЬ ЕЩЕ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
