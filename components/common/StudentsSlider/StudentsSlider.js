import React from 'react';
import Image from 'next/image';
import { studentsWork } from '../../constants/studentsWork.js';
import Slider from 'react-slick/lib/slider';

export default function StudentsSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: '80px',
    centerMode: true,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: '110px',
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
        breakpoint: 512,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {studentsWork.map((el) => (
        <div className="students-work" key={el.id}>
          <Image loader={() => el.url} width={1000} height={610} src={el.url} alt={el.name} />
          <div>
            <div>{el.name}</div>
            <div>{el.direction}</div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
