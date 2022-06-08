import React from 'react'
import Link from "next/link"
import Image from "next/image"

export default function KyrsQuizCard(props) {
  return (
          <Link key={props.id} href={"/kyrsy/" + props.id}>
              <div className="kyrs-card kyrs-card_quiz">
                  <Image loading="eager"
                      unoptimized
                      src={props.url}
                      alt={props.title}
                      width={350}
                      height={365}
                  />
                  <div className='kyrs-card_text_wrapper'>
                      <div className="kyrs-card_text">
                          <div className="kyrs-card_title">
                              {props.title}
                          </div>
                          <div className='kyrs-card-text_des'>
                              {props.des}
                          </div>
                          <div className="kyrs-card-text_block">
                              <div>{props.teachers?.length > 1 ? "Преподователи:" : "Преподователь"}</div>
                              <div>
                                  {props.teachers?.map((item, index) => props.teachers?.length > 1 ? item + (index === props.teachers?.length - 1 ? "" : ", ") : item)}
                              </div>
                          </div>
                          {
                              props.start ?
                                  <div className="kyrs-card-text_block">
                                      <div>Старт курса:</div>
                                      <div>
                                          {new Date(props.start?.seconds * 1000).toLocaleDateString()}
                                      </div>
                                  </div> :
                                  ""
                          }
                          <div className="kyrs-card-text_block">
                              <div>Длительность:</div>
                              <div>
                                  {
                                      props.duration
                                  }
                                  {
                                      props.duration == 1 ? " час" : props.duration == 2 ? " часа" : " часов"
                                  }
                              </div>
                          </div>
                          <div className="kyrs-card-text_block">
                              <div>Стоимость:</div>
                              <div>
                                  {props.price}
                              </div>
                          </div>
                          <div className="kyrs-card-text_block">
                              <div>Свободные места:</div>
                              <div>
                                  {props.freePlace}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </Link>
  )
}
