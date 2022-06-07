import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick/lib/slider';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase.js';
import { useRouter } from "next/router"
import Preloader from '../Preloader/Preloader.js';

export default function StudentsSlider({ id, home }) {
  const rout = useRouter()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    centerPadding: '120px',
    centerMode: true,
    swipeToSlide: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          centerPadding: '250px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "200px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          centerPadding: '150px',
        },
      },
      {
        breakpoint: 960,
        settings: {
          centerPadding: "200px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "150px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerPadding: "100px"
        },
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  const [students, setStudents] = useState([])
  const [directionCardList, setDirectionCardList] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.collection("directionCardList/" + id + "/studentWork")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const student = []
        snapshot.forEach((doc) => {
          student.push({ ...doc.data(), id: doc.id })
        })
        setStudents(student)
      })
  }, [id])


  useEffect(() => {
    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        setIsLoading(false)
        const directionCard = []
        snapshot.forEach((doc) => {
          directionCard.push({ ...doc.data(), id: doc.id })
        })
        setDirectionCardList(directionCard.find((el) => el.id === id))
      })
  }, [id])


  if (isLoading) {
    return <Preloader full />
  }
  return (

    <>
      <div className='students_wrapper'>
        {
          students.length < 4 ?
            <>

              <div className='direction-title'>{directionCardList?.direction}</div>
              <div className='response-students'>

                {students.map((el) => (
                  <div className="students-work" key={el.id}>
                    <Image loading='eager' unoptimized layout="intrinsic" width={300} height={450} src={el.url} alt={directionCardList?.direction} />

                  </div>
                ))}
              </div>
            </>


            : <div className='students_slider-wrapper'>
              {!home ? <div className='direction-title'>{directionCardList?.direction}</div> : ""}
              <Slider {...settings}>
                {students.map((el) => (
                  <div key={el.id}>
                    <div className="students-work students-work-slider">
                      <Image loading='eager' unoptimized width="100%" height="100%" layout="intrinsic" src={el.url} alt={directionCardList?.direction} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
        }
      </div>
    </>
  );
}
