import Link from 'next/link';

import Image from 'next/image';
import StudentsSlider from '../common/StudentsSlider/StudentsSlider.js';

export default function StudentsWorkPage() {
  return (
    <div className="container ">
      <div className="block-top">
        <div>Все Работы</div>
        <div>Каталог отдельных работ</div>
      </div>

      <div className="kyrs-cards_wrapper">
        <StudentsSlider />
      </div>
      <div className="step_wrapper kyrs_wrapper">
        {
          <Image
            className={'kyrs-fade_left '}
            width={270}
            height={270}
            src={'/sh1.png'}
            alt="sh1"
          />
        }
        <div className="direction-title">НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?</div>
        <div className="studios_des">Мы поможем с выбором курса</div>
        <div className="btn_wrapper">
          <Link href="#quiz">
            <button className="btn">ПРОЙТИ ОПРОС</button>
          </Link>
        </div>
        <Image className={'kyrs-fade_right '} width={250} height={250} src={'/sh2.png'} alt="sh2" />
      </div>
    </div>
  );
}
