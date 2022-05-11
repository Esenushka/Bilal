import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick/lib/slider";
import { studentsWork } from "../../constants/studentsWork";
import { LessonsDesList } from "../../constants/LessonsDesList";

export default function Lessons() {
    const [offset, setOffset] = useState();
    const [innerWidth, setInnerWidth] = useState(0)
    const handleScroll = () => setOffset(window.pageYOffset);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })
    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        centerPadding: "80px",
        centerMode: true,
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: "110px"
                }
            },
            {
                breakpoint: 900,
                settings: {
                    centerMode: false,
                    centerPadding: 0,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 512,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "0px"
                }
            }
        ]

    }
    return (
        <div className="lessons_wrapper">
            <div className="quiz_title">КАК ПРОХОДИТ ОБУЧЕНИЕ</div>
            <div className="quiz_des">и сколько времени в неделю тратит студент </div>
            <div className="trainning_wrapper">
                <div className="trainning_days">
                    <div style={{ color: (offset > 1500 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Cуббота" : "Cб"}</div>
                    <div style={{ color: (offset > 1700 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Воскресенье" : "Вс"}</div>
                    <div style={{ color: (offset > 1900 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Понедельник" : "Пн"}</div>
                    <div style={{ color: (offset > 2100 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Вторник" : "Вт"}</div>
                    <div style={{ color: (offset > 2300 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Среда" : "Ср"}</div>
                    <div style={{ color: (offset > 2500 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Четверг" : "Чт"}</div>
                    <div style={{ color: (offset > 2700 ? "#66097b" : "#e1e1e1") }}>{innerWidth > 768 ? "Пятница" : "Пт"}</div>
                </div>
                <div style={{ "--bar": (offset > 1300 ? -700 + offset / 2 : 0) + "px" }} className="trainning_bar"></div>
                <div className="trainning_text">
                    <div style={{ color: (offset > 1500 ? "black" : "#e1e1e1") }}>
                        <div>Онлайн-встреча с преподавателем, разбор работ.</div>
                        <div>~ 2–3 часа</div>
                    </div>
                    <div style={{ color: (offset > 1700 ? "black" : "#e1e1e1") }}>
                        <div>Самостоятельное изучение теории на учебной платформе.</div>
                        <div>~ 2 часа</div>
                    </div>
                    <div style={{ color: (offset > 1900 ? "black" : "#e1e1e1") }}>
                        <div>
                            Самостоятельное выполнение задания.
                        </div>
                        <div>~ 2 часа</div>
                    </div>
                    <div style={{ color: (offset > 2100 ? "black" : "#e1e1e1") }}>
                        <div>
                            Самостоятельное выполнение задания.
                        </div>
                        <div>~ 2 часа</div>
                    </div>
                    <div style={{ color: (offset > 2300 ? "black" : "#e1e1e1") }}>
                        <div>Выполнение задания, промежуточная проверка.</div>
                        <div>~ 2 часа</div>
                    </div>
                    <div style={{ color: (offset > 2500 ? "black" : "#e1e1e1") }}>
                        <div>Самостоятельное выполнение
                            задания.</div>
                        <div>~ 2 часа</div>
                    </div>
                    <div style={{ color: (offset > 2700 ? "black" : "#e1e1e1") }}>
                        <div>Самостоятельное выполнение
                            задания.</div>
                        <div>~ 2 часа</div>
                    </div>
                </div>
            </div>
            <div className="result">
                <div>Итого: 14-15 часов в неделю</div>
                <div>*схема указана примерно и может отличаться в зависимости от курса</div>
            </div>
            <div className="lessons_card-wrapper container">
                {
                    LessonsDesList.map((el) => <div className="lessons_card" key={el.id}>
                        <Image loader={() => el.url} width={80} height={80} src={el.url} alt="card" />
                        <div>
                            <div>{el.title}</div>
                            <div>{el.des}</div>
                        </div>
                    </div>)
                }
            </div>
            <div className="direction-title">РАБОТЫ СТУДЕНТОВ</div>
            <div className="students_work_wrapper">
                <Slider {...settings}>
                    {
                        studentsWork.map((el) => <div className="students-work" key={el.id}>
                            <Image loader={() => el.url} width={1000} height={610} src={el.url} alt={el.name} />
                            <div>
                                <div>{el.name}</div>
                                <div>{el.direction}</div>
                            </div>
                        </div>)
                    }
                </Slider>
                <div>Портфолио школы за 2021</div>
                <div className="btn_wrapper">
                    <Link href={"#"}>
                        <button className="btn">СМОТРЕТЬ ЕЩЕ</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
