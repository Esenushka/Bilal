import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function KyrsCard({ url, title, teachers, start, duration, price, id, freePlace, des }) {

    const router = useRouter()

    return (
        <Link href={router.pathname === "/admin/dashboard" ? ("/admin/kyrs/" + id) : ("/kyrsy/" + id)}>
            <div className="kyrs-card">
                <Image loading="eager"
                    unoptimized
                    src={url}
                    alt={title}
                    width={350}
                    height={365}
                />
                <div className='kyrs-card_text_wrapper'>
                    <div className="kyrs-card_text">
                        <div className="kyrs-card_title">
                            {title}
                        </div>
                        <div className='kyrs-card-text_des'>
                            {des}
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>{teachers?.length > 1 ? "Преподователи:" : "Преподователь"}</div>
                            <div>
                                {teachers?.map((el, index) => teachers?.length > 1 ? el + (index === teachers?.length - 1 ? "" : ", ") : el)}
                            </div>
                        </div>
                        {
                            start ?
                                <div className="kyrs-card-text_block">
                                    <div>Старт курса:</div>
                                    <div>
                                        {new Date(start?.seconds * 1000).toLocaleDateString()}
                                    </div>
                                </div> :
                                ""
                        }
                        <div className="kyrs-card-text_block">
                            <div>Длительность:</div>
                            <div>
                                {
                                    duration
                                }
                                {
                                    Number(duration) <= 1 ? " час" : Number(duration) < 5 ? " часа" : " часов"
                                }
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Стоимость:</div>
                            <div>
                                {price}
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Свободные места:</div>
                            <div>
                                {freePlace}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
