import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from "next/link"
import { db } from '../../../config/firebase'
import KyrsQuizCard from './KyrsQuizCard'

export default function Quiz() {
    const [active, setActive] = useState(0)
    const [directionCardList, setDirectionCardList] = useState([])
    const [child, setChild] = useState()
    const [vyz, setVyz] = useState()
    const [ready, setReady] = useState()
    const [fashion, SetFashion] = useState()
    const [academy, setAcademy] = useState()
    const [digital, setDigital] = useState()

    const handleChange = (name) => {
        const quizBlock = document.getElementsByClassName("quiz_block-wrapper")
        quizBlock[active]?.classList.remove("active")
        setActive(active + 1)
        quizBlock[active + 1].classList.add("active")
        const vyzData = document.getElementsByName(name)
        vyzData.forEach((el) => el.checked ? setVyz(Number(el.dataset.vyz)) : "")
        const childData = document.getElementsByName(name)
        childData.forEach((el) => el.checked ? setChild(Number(el.dataset.child)) : "")
        const readyData = document.getElementsByName(name)
        readyData.forEach((el) => el.checked ? setReady(Number(el.dataset.ready)) : "")
        const fashionData = document.getElementsByName(name)
        fashionData.forEach((el) => el.checked ? SetFashion(Number(el.dataset.fashion)) : "")
        const academyData = document.getElementsByName(name)
        academyData.forEach((el) => el.checked ? setAcademy(Number(el.dataset.academy)) : "")
        const digitalData = document.getElementsByName(name)
        digitalData.forEach((el) => el.checked ? setDigital(Number(el.dataset.digital)) : "")
    }

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(direction)
            })
    }, [])

    return (
        <div id='quiz' className='quiz_wrapper'>
            <div className='quiz' >
                <div className='quiz_block-wrapper active'>
                    <div className='quiz_block active'>
                        <div className='quiz_title'>???????????? ?????????????????? ???????? ???????? ?? ?????? ?????????????????? ?</div>
                        <div className='quiz_des'>
                            ???????????????? ???????? ?? ??????????????, ?????????? ??????????????????
                            ???????????????? ??????!
                        </div>
                        <Image width={327} height={292} src="/quizLogo.png" alt="quziLogo"  />
                        <div className='btn-wrapper quiz-btn_wrapper '>
                            <button onClick={handleChange} className='btn quiz-btn'>
                                ????????????
                            </button>
                        </div>
                    </div>
                </div>
                <div className='quiz_block-wrapper'>
                    <div className='quiz_block'>
                        <div className='quiz_title'>???????????? ???1</div>
                        <div className='quiz_des'>
                            ?????????????? ?????? ???????
                        </div>
                        <div className='label_wrapper'>
                            <label>
                                <div>5 - 11 ??????</div>
                                <input
                                    data-child={100} defaultChecked name='radio1' type={"radio"} />
                                <span className='checkmark'></span>
                            </label>
                            <label>
                                <div>???????????? 12</div>
                                <input
                                    data-child={0} name='radio1' type={"radio"} />
                                <span className='checkmark'></span>
                            </label>

                        </div>
                        <div className='btn-wrapper quiz-btn_wrapper '>
                            <button onClick={() => handleChange("radio1")} className='btn quiz-btn'>
                                ????????????
                            </button>
                        </div>
                </div>
                </div>
                {
                    child == 0 ? <div className={'quiz_block-wrapper ' + (child == 0 ? "active" : "")}>
                        <div className={'quiz_block ' + (child == 0 ? "active" : "")}>
                            <div className='quiz_title'>???????????? ???2</div>
                            <div className='quiz_des'>
                                ???????????????????? ???? ???? ?? ?????? ?? ???????????????????? ?????????????????????????
                            </div>
                            <div className='label_wrapper'>
                                <label>
                                    ????
                                    <input data-vyz={100} defaultChecked name='radio2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>

                                    ??????
                                    <input data-vyz={0} name='radio2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ?????????????????????? ????????????????
                                    <input data-vyz={0} name='radio2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                            </div>
                            <div className='btn-wrapper quiz-btn_wrapper '>
                                <button onClick={() => handleChange("radio2")} className='btn quiz-btn'>
                                    ????????????
                                </button>
                            </div>
                        </div>

                    </div> : <div className='quiz_block child-quiz quiz_block-wrapper'>
                        <div className='quiz_title'>???????????????? ?????? ????????????????</div>
                        {
                            directionCardList.map((el) => (
                                child == el.dataChild ? <Link key={el.id} href={"/kyrsy/" + el.id}>
                                    <div className="kyrs-card quiz-kyrs_card ">
                                        <Image loading="eager"
                                            unoptimized
                                            src={el.url}
                                            alt={el.title}
                                            width={350}
                                            height={365}
                                        />
                                        <div className='kyrs-card_text_wrapper'>
                                            <div className="kyrs-card_text">
                                                <div className="kyrs-card_title">
                                                    {el.title}
                                                </div>
                                                <div className='kyrs-card-text_des'>
                                                    {el.des}
                                                </div>
                                                <div className="kyrs-card-text_block">
                                                    <div>{el.teachers?.length > 1 ? "??????????????????????????:" : "??????????????????????????"}</div>
                                                    <div>
                                                        {el.teachers?.map((item, index) => el.teachers?.length > 1 ? item + (index === el.teachers?.length - 1 ? "" : ", ") : item)}
                                                    </div>
                                                </div>
                                                {
                                                    el.start ?
                                                        <div className="kyrs-card-text_block">
                                                            <div>?????????? ??????????:</div>
                                                            <div>
                                                                {new Date(el.start?.seconds * 1000).toLocaleDateString()}
                                                            </div>
                                                        </div> :
                                                        ""
                                                }
                                                <div className="kyrs-card-text_block">
                                                    <div>????????????????????????:</div>
                                                    <div>
                                                        {
                                                            el.duration
                                                        }
                                                        {
                                                            el.duration == 1 ? " ??????" : el.duration == 2 ? " ????????" : " ??????????"
                                                        }
                                                    </div>
                                                </div>
                                                <div className="kyrs-card-text_block">
                                                    <div>??????????????????:</div>
                                                    <div>
                                                        {el.price}
                                                    </div>
                                                </div>
                                                <div className="kyrs-card-text_block">
                                                    <div>?????????????????? ??????????:</div>
                                                    <div>
                                                        {el.freePlace}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link> : ""
                            ))
                        }

                    </div>
                }
                {
                    vyz == 0 ? <div className={"quiz_block-wrapper " + (vyz == 0 ? "active" : "")}>
                        <div className={'quiz_block ' + (vyz == 0 ? "active" : "")}>
                            <div className='quiz_title'>???????????? ???3</div>
                            <div className='quiz_des'>
                                ???????? ???? ???????????? ???????????????????
                            </div>
                            <div className='label_wrapper'>
                                <label>
                                    ???????????????? ????????????????, ??????????????, ????????????????????, ????????????????????
                                    <input data-academy={100} defaultChecked name='radio3' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ???????????????? ???????????? ????????????????????, ???????????? ???? ??????????????
                                    <input data-fashion={100} name='radio3' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ???????????????? ???? ?????????????????????? ????????????????, ???????????????? ?? ??????????, ???????????????? ?? ?????????????? 2D
                                    <input data-digital={100} name='radio3' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ???????????????? ?????????????????????? ?????? ?????????????????? ??????????????
                                    <input data-academy={100} name='radio3' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                            </div>
                            <div className='btn-wrapper quiz-btn_wrapper '>
                                <button onClick={() => handleChange("radio3")} className='btn quiz-btn'>
                                    ????????????
                                </button>
                            </div>
                        </div>

                    </div> : <div className={"quiz_block-wrapper " + (vyz === 100 ? "active" : "")}>
                        <div className={'quiz_block ' + (vyz == 100 ? "active" : "")}>
                            <div className='quiz_title'>???????????? ???3</div>
                            <div className='quiz_des'>
                                ?????????? ?????????????????? ???? ???????????????
                            </div>
                            <div className='label_wrapper'>
                                <label>
                                    ????????????????
                                    <input data-ready={100} defaultChecked name='radio3_2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ???????????????????? ?????? ???????????????? ??????????????????
                                    <input data-ready={100} name='radio3_2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ???????????????? ????????????
                                    <input data-fashion={100} name='radio3_2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ?????????????????????? ????????????????
                                    <input data-digital={100} name='radio3_2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                                <label>
                                    ????????????
                                    <input data-ready={100} name='radio3_2' type={"radio"} />
                                    <span className='checkmark'></span>
                                </label>
                            </div>
                            <div className='btn-wrapper quiz-btn_wrapper '>
                                <button onClick={() => handleChange("radio3_2")} className='btn quiz-btn'>
                                    ????????????
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className='quiz_block-wrapper'>
                    <div className='quiz_block'>
                        <div className='quiz_title'>???????????????? ?????? ????????????????</div>
                        {
                            directionCardList.map((el) => (
                                ready == el.dataReady ?
                                    <KyrsQuizCard key={el.id} {...el} /> :
                                    fashion == el.dataFashion ?
                                        <KyrsQuizCard key={el.id}  {...el} /> :
                                        academy == el.dataAcademy ?
                                            <KyrsQuizCard key={el.id} {...el} /> :
                                            digital == el.dataDigital ?
                                                <KyrsQuizCard key={el.id} {...el} /> : ""
                            ))
                        }
                    </div>
               </div>


            </div>
        </div>
    )
}
