import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick/lib/slider';
import { useEffect, useState } from 'react';
import { db } from '../../../config/firebase.js';
import { useRouter } from "next/router"
import Link from "next/link"
import Preloader from '../Preloader/Preloader.js';

export default function StudentsSlider({ id }) {
  const rout = useRouter()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '150px',
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '110px',
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
        breakpoint: 900,
        settings: {
          centerMode: false,
          centerPadding: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerMode: false,
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

  if(isLoading){
    return <Preloader full/>
  }

  return (
    <div className='students_wrapper'>
      {
        students.length < 4 ?


          <div className='response-students'>
            {students.map((el) => (
              <div className="students-work" key={el.id}>
                <Image unoptimized width={300} height={450} src={el.url} alt={el.name} />
                <div>
                  <div>{el.name}</div>
                  <div>{el.des}</div>
                </div>
              </div>
            ))}
          </div>


          :
          <Slider {...settings}>
            {students.map((el) => (
              <div className="students-work" key={el.id}>
                <Image unoptimized width={300} height={450} src={el.url} alt={el.name} />
                <div>
                  <div>{el.name}</div>
                  <div>{el.des}</div>
                </div>
              </div>
            ))}
          </Slider>
      }
    </div>
  );
}
