import { useRouter } from "next/router"
import Link from "next/link";
import { directionCardList } from "../constants/directionCardList";
import KyrsCard from "../common/KyrsCard/KyrsCard";
import Image from "next/image"
import { db } from "../../config/firebase";
import { useEffect,useState } from "react";

export default function KyrsyPage() {
  const router = useRouter()
  const query = Object.keys(router.query)[0]
  const [directionList, setDirectionList] = useState([])

  useEffect(() => {
    db.collection("directionList")
      .get()
      .then((snapshot) => {

        const direction = []
        snapshot.forEach((doc) => {
          direction.push({ ...doc.data(), id: doc.id })
        })
        setDirectionList(direction)
      })
  }, [])

  const Joined = (
    directionCardList.map((el) =>
      query === undefined ? <KyrsCard {...el} /> : el.directions.map((item) => item === query ? <KyrsCard {...el} /> : "")
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
          directionList.map((el) => <Link key={el.id} href={router.pathname + "?" + el.urlDirection}>
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
              query === undefined ? <KyrsCard key={el.id} {...el} /> : el.directions.map((item) => item === query ? <KyrsCard {...el} /> : "")
            )
          ) : <div className="nothing">
            Такого курса пока нет!
          </div>
        }

      </div>
      <div className='step_wrapper kyrs_wrapper'>
        {<Image
          className={'kyrs-fade_left '}
          width={270} height={270} src={"/sh1.png"} alt="sh1" />}
        <div className='direction-title'>
          НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?
        </div>
        <div className='studios_des'>
          Мы поможем с выбором курса
        </div>
        <div className='btn_wrapper'>
          <Link href='#quiz'>
            <button className='btn'>ПРОЙТИ ОПРОС</button>
          </Link>
        </div>
        <Image className={'kyrs-fade_right '} width={250} height={250} src={"/sh2.png"} alt="sh2" />
      </div>
    </div>
  )
}
