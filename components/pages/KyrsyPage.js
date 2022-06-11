import { useRouter } from "next/router"
import Link from "next/link";
import KyrsCard from "../common/KyrsCard/KyrsCard";
import Image from "next/image"
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import Preloader from "../common/Preloader/Preloader";

export default function KyrsyPage() {
  const router = useRouter()
  const query = Object.keys(router.query)[0]
  const [directionCardList, setDirectionCardList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const directionCards = []
        snapshot.forEach((doc) => {
          directionCards.push({ ...doc.data(), id: doc.id })
        })
        setDirectionCardList(directionCards)
      });

  }, [])

  if(isLoading){
    return <Preloader full/>
  }

  const Joined = (
    directionCardList.map((el) =>
      query === undefined ? <KyrsCard {...el} /> : (el.urlDirection === query ? <KyrsCard {...el} /> : "")
    )
  ).join("")
  return (
    <div className="container ">
      <div className="block-top">
        <div>Все курсы</div>
        <div>Каталог отдельных курсов</div>
      </div>
      <div className="kyrs-filter">
        {
          directionCardList.map((el) => <Link key={el.id} href={router.pathname + "?" + el.urlDirection}>
            <a className={query === el.urlDirection ? "active" : ""}>
              {el.direction}
            </a>
          </Link>)
        }
        <Link href="/kyrsy">
          <a className={query === undefined ? "active" : ""}>
            Все
          </a>
        </Link>
      </div>
      <div className="kyrs-cards_wrapper">
        {
          Joined ? (
            directionCardList.map((el) =>
              query === undefined ? <KyrsCard key={el.id} {...el} /> : (el.urlDirection === query ? <KyrsCard {...el} /> : "")
            )
          ) : <div className="nothing">
            Такого курса пока нет!
          </div>
        }

      </div>
      <div className='step_wrapper kyrs_wrapper_quiz'>
        <div className='direction-title'>
          НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?
        </div>
        <div className='studios_des'>
          Мы поможем с выбором курса
        </div>
        <div className='btn_wrapper'>
          <Link href='/#quiz'>
            <button className='btn'>ПРОЙТИ ОПРОС</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
