import React from 'react'
import Image from "next/image"

export default function KyrsCard({ imgUrl, title, des, teachers, start, duration, price }) {
    return (
        <div className="kyrs-card">
            <Image loader={() => imgUrl}
                src={imgUrl}
                alt={title}
                width={350}
                height={365}
            />
            <div className='kyrs-card_text_wrapper'>
                <div className="kyrs-card_text">
                    <div className="kyrs-card_title">
                        {title}
                    </div>
                    <div className="kyrs-card_des">
                        {des}
                    </div>
                    <div className="kyrs-card-text_block">
                        <div>Преподаватель:</div>
                        <div>
                            {teachers.map((el) => el)}
                        </div>
                    </div>
                    <div className="kyrs-card-text_block">
                        <div>Старт курса:</div>
                        <div>
                            {start}
                        </div>
                    </div>
                    <div className="kyrs-card-text_block">
                        <div>Длительность:</div>
                        <div>
                            {duration}
                        </div>
                    </div>
                    <div className="kyrs-card-text_block">
                        <div>Стоимость:</div>
                        <div>
                            {price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
