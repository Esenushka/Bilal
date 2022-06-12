import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db, storageRef } from '../../../config/firebase';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat/app';
import Link from "next/link"

export default function NewKyrs() {
  const [newData, setNewData] = useState({})
  const [directionCardList, setDirectionCardList] = useState({})
  const [teachers, setTeachers] = useState([])
  const [file, setFile] = useState("");
  const [fileData, setFileData] = useState("");
  const [videofile, setVideoFile] = useState("");
  const [videoFileData, setVideoFileData] = useState("");
  const [fileSecond, setFileSecond] = useState("");
  const [fileSecondData, setFileSecondData] = useState("");
  const [urlDirection, setUrlDirection] = useState("")
  const [reaload, setReload] = useState(false)

  const router = useRouter()
  const id = router.query?.id

  const getUrl = async (name) => await storageRef
    .ref()
    .child("items/" + name)
    .getDownloadURL()
    .then((url) => {
      return url
    })


  useEffect(() => {
    db.collection("directionCardList")
      .get()
      .then((snapshot) => {
        const directionCard = []
        snapshot.forEach((doc) => {
          directionCard.push({ ...doc.data(), id: doc.id })
        })
        setDirectionCardList(directionCard)
      });
  }, [id]);






  const submit = (e) => {
    e.preventDefault()
    const body = document.getElementsByTagName("body")[0]
    const data = {
      ...newData,
      teachers: teachers,
      urlDirection: urlDirection,
      dataChild: 0
    }
    setReload(true)
    body.style.overflowY = "hidden"
    storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
      getUrl(fileData.name).then((url) => {
        data = { ...data, url: url }
        storageRef.ref("items/" + videoFileData.name).put(videoFileData).then(() => {
          getUrl(videoFileData.name).then((secondUrl) => {
            data = { ...data, videoInvite: secondUrl }
            storageRef.ref("items/" + fileSecondData.name).put(fileSecondData).then(() => {
              getUrl(fileSecondData.name).then((thirdUrl) => {
                db.collection("directionCardList").add({ ...data, secondImgUrl: thirdUrl })
                  .then(() => {
                    body.style.overflowY = "visible"
                    setReload(false)
                    router.push("/admin/dashboard")
                  })
              })
            })

          })
        })
      })
    })

  }

  const removeTeacher = (index) => {
    teachers.splice(index, 1)
    setTeachers([...teachers])
  }

  const addTeacher = (e, index) => {
    teachers[index] = e.target.value
    setTeachers([...teachers])
  }



  const handleChange = (target, setFilesData, setFiles) => {
    if (target.files.length) {
      const reader = new FileReader();
      setFilesData(target.files[0]);
      reader.readAsDataURL(target.files[0]);
      reader.onload = (e) => {
        const newUrl = e.target.result;
        setFiles(newUrl);
      };
    }

  };

  const addDirection = (e) => {
    setNewData({ ...newData, direction: e.target.value })
    translit(e.target.value)
  }

  function translit(word) {
    const converter = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
      'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
      'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    word = word.toLowerCase();

    let answer = '';
    for (let i = 0; i < word.length; ++i) {
      if (converter[word[i]] == undefined) {
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }

    answer = answer.replace(/[^-0-9a-z]/g, '-');
    answer = answer.replace(/[-]+/g, '-');
    answer = answer.replace(/^\-|-$/g, '');
    setUrlDirection(answer)
  }
  return (
    <form onSubmit={submit} className='kyrs-edit-card'>
      <div className='back-to'>
        <Link href="/admin/dashboard">
          <div className='back-to-dasboard'>
            <Image loading="eager"
              unoptimized
              width={40}
              height={40}
              alt='arrow'
              src={"/right-arrow.png"}
            />
          </div>
        </Link>
      </div>
      <div className='direction_edit-kyrs container'>
        <h4>Напровления</h4>
        <input
          required
          onChange={(e) => addDirection(e)}
          type={"text"} />
      </div>
      <div className="container">
        <div>
          <input
            required
            onChange={({ target }) => handleChange(target, setFileData, setFile)}
            type={"file"} />
        </div>
        <div className={"kyrs-card_main-block edit-card " + (!file ? "activeImage" : "")}>
          {
            file ? <Image loading="eager"
              unoptimized
              src={file}
              alt={'Главная картинка'}
              width={300}
              height={500}
            /> : <Image loading="eager"
              unoptimized
              src={"/file-image.png"}
              alt={'Главная картинка'}
              width={300}
              height={500}
            />
          }
          <div className="kyrs-card_main-text">
            <div className="kyrs-card-text_title">
              <input
                onChange={(e) => { setNewData({ ...newData, title: e.target.value }) }}
                required
                type={"text"}
              />
            </div>
            <div className='kyrs-card-text_des'>
              <textarea
                required
                onChange={(e) => { setNewData({ ...newData, des: e.target.value }) }}

              ></textarea>
            </div>
            <div className="kyrs-card-text_block">
              <div>{directionCardList.teachers?.length > 1 ? 'Преподватели:' : 'Преподователь:'}</div>
              <div>
                {
                  teachers.length > 0 ? teachers?.map((el, index) => <label className='teachers-edit-label' key={index}>
                    <input
                      value={teachers[index]}
                      required
                      onChange={(e) => addTeacher(e, index)}
                      type={"text"} />
                    <Image loading="eager" onClick={() => removeTeacher(index)} src={"/minus.png"} alt="deleteImg" width={1000} height={1000} />
                  </label>
                  )
                    : <label>
                      <input
                        onChange={(e) => addTeacher(e, 0)}
                        required type={"text"} />
                    </label>
                }
                <div className='add-edit-image'>
                  <Image loading="eager"
                    onClick={() => setTeachers([...teachers, ""])}
                    src={"/add.png"}
                    alt="addImg"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
            <div className="kyrs-card-text_block">
              <div>Регистрация открыта до:</div>
              <input type={"date"}
                onChange={(e) => { setNewData({ ...newData, register: e.target.value ? firebase.firestore.Timestamp.fromDate(new Date(e.target.value)) : "" }) }}

              />

            </div>
            <div className="kyrs-card-text_block">
              <div>Старт курса:</div>
              <div>
                <input type={"date"}
                  onChange={(e) => { setNewData({ ...newData, start: e.target.value ? firebase.firestore.Timestamp.fromDate(new Date(e.target.value)) : "" }) }}


                />
              </div>
            </div>
            <div className="kyrs-card-text_block">
              <div>Длительность:</div>
              <div>
                <input type={"text"}
                  required
                  onChange={(e) => { setNewData({ ...newData, duration: e.target.value }) }}
                />
              </div>
            </div>
            <div className="kyrs-card-text_block">
              <div>Стоимость:</div>
              <div>
                <input type={"number"}
                  required
                  onChange={(e) => { setNewData({ ...newData, price: e.target.value }) }}
                />
              </div>
            </div>
            <div className="kyrs-card-text_block">
              <div>Свободные места:</div>
              <div>
                <input type={"text"}
                  required
                  onChange={(e) => { setNewData({ ...newData, freePlace: e.target.value }) }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="direction-title">ВИДЕОПРИГЛАШЕНИЕ</div>
        <div className='video-input'>
          <div>
            <input
              onChange={({ target }) => handleChange(target, setVideoFileData, setVideoFile)}
              type={"file"}
              required
            />
          </div>
        </div>
        <div className="video-invite edit-video">
          {
            videoFileData ?
              <video
                width="920"
                height="518"
                controls
                src={videofile}
              ></video>
              : <video width="920" height="518" controls >
              </video>
          }
        </div>
      </div>
      <div className="kyrs-card_info edit-info">
        <div className="container">
          <div className={!fileSecond ? "activeImage" : ""}>
            {
              fileSecond ?
                <Image loading="eager"
                  unoptimized
                  src={fileSecond}
                  alt={'Второя картинка'}
                  width={600}
                  height={700}
                /> : <Image loading="eager"
                  unoptimized
                  src={"/file-image.png"}
                  alt={'Второя картинка'}
                  width={600}
                  height={700}
                />
            }
            <input
              onChange={({ target }) => handleChange(target, setFileSecondData, setFileSecond)}
              className='edit-info_input'
              type={"file"}
              required
            />
          </div>
          <div className="kyrs-card_about">
            <div className="kyrs-card_about-block">
              <div className="kyrs-card_about-title">ДЛЯ КОГО ЭТОТ КУРС?</div>
              <div className="kyrs-card_about-des">
                <textarea onChange={(e) => setNewData({ ...newData, forWho: e.target.value })} required ></textarea>
              </div>
            </div>
            <div className="kyrs-card_about-block">
              <div className="kyrs-card_about-title">О КУРСЕ</div>
              <div className="kyrs-card_about-des">
                <textarea required onChange={(e) => setNewData({ ...newData, about: e.target.value })} ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='btn-wrapper buttons'>
        <button className='btn'>Сохранить</button>
      </div>
      <div className={'preloader ' + (reaload ? "active" : "")}>
        <svg id="preloader" width="240px" height="120px" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

          <path id="loop-normal" className="st1" d="M120.5,60.5L146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5
L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0z">
            <animate attributeName="stroke-dasharray" from="500, 50" to="450 50" begin="0s" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" from="-40" to="-540" begin="0s" dur="2s" repeatCount="indefinite" />
          </path>

          <path id="loop-offset" d="M146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0L120.5,60.5L146.48,87.02z"></path>

          <path id="socket" d="M7.5,0c0,8.28-6.72,15-15,15l0-30C0.78-15,7.5-8.28,7.5,0z">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              rotate="auto"
              keyTimes="0;1"
              keySplines="0.42, 0.0, 0.58, 1.0"
            >
              <mpath xlinkHref="#loop-offset" />
            </animateMotion>
          </path>

          <path id="plug" d="M0,9l15,0l0-5H0v-8.5l15,0l0-5H0V-15c-8.29,0-15,6.71-15,15c0,8.28,6.71,15,15,15V9z">
            <animateMotion
              dur="2s"
              rotate="auto"
              repeatCount="indefinite"
              keyTimes="0;1"
              keySplines="0.42, 0, 0.58, 1"
            >
              <mpath xlinkHref="#loop-normal" />
            </animateMotion>
          </path>

        </svg>
      </div>
    </form>
  );
}
