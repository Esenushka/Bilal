import Link from 'next/link';
import { useRouter } from "next/router"
import Image from 'next/image';
import StudentsSlider from '../common/StudentsSlider/StudentsSlider.js';
import { useState, useEffect } from 'react';
import { db } from '../../config/firebase.js';
import Preloader from '../common/Preloader/Preloader.js';

export default function StudentsWorkPage() {
  const [directionCardList, setDirectionCardList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const direction = []
        snapshot.forEach((doc) => {
          direction.push({ ...doc.data(), id: doc.id })
        })
        setDirectionCardList(direction)
      })
  }, [])

  const router = useRouter()
  const query = Object.keys(router.query)[0]

  if (isLoading) {
    return <Preloader full />
  }


  const Joined = (
    directionCardList.map((el) =>
      query === undefined ? <StudentsSlider {...el} /> : (el.urlDirection === query ? <StudentsSlider {...el} /> : "")
    )
  ).join("")
  return (
    <div>
      <div className='container'>
        <div className="block-top ">
          <div>Все Работы</div>
          <div>Каталог отдельных работ</div>
        </div>
      </div>
      <div className="kyrs-filter">
        {
          directionCardList.map((el) => el.notStudents ? "" : <Link key={el.id} href={router.pathname + "?" + el.urlDirection}>
            <a className={query === el.urlDirection ? "active" : ""}>
              {el.direction}
            </a>
          </Link>)
        }
        <Link href="/studentsworks">
          <a className={query === undefined ? "active" : ""}>
            Все
          </a>
        </Link>
      </div>
      <div className="kyrs-cards_wrapper students_wrapper">
        {
          Joined ? (
            directionCardList.map((el) =>
              query === undefined ? <StudentsSlider key={el.id} {...el} /> : (el.urlDirection === query ? <StudentsSlider {...el} /> : "")
            )
          ) : <div className="nothing">
            Такого напровления пока нет!
          </div>
        }

      </div>
      <div className='container'>
        <div className="step_wrapper kyrs_wrapper_quiz">
          <div className="direction-title">НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?</div>
          <div className="studios_des">Мы поможем с выбором курса</div>
          <div className="btn_wrapper">
            <Link href="/#quiz">
              <button className="btn">ПРОЙТИ ОПРОС</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
