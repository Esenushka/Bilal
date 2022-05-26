import '../styles/globals.css'
import '../styles/style.scss'
import '../styles/header.scss'
import '../styles/kyrsy.scss'
import '../styles/contacts.scss'
import '../styles/blog.scss'
import '../styles/admin.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/kyrsyEdit.scss"
import "../styles/preloader.scss"
import "../styles/media.scss"
import { useEffect, useState } from "react"
import firebase from "../config/firebase.js";
import WithAuth from '../hooks/privateAuth'
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {

  const { pathname } = useRouter();
  const [isIncludeAdmin, setIsIncludeAdmin] = useState();
  const [isAuth, setIsAuth] = useState(false);



  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsAuth(user?.toJSON())
      } else {
        setIsAuth(false)
      }
    });
  }, []);
  useEffect(() => {
    const arr = pathname.split("/");
    const check = arr.includes("admin") && arr.length > 2
    setIsIncludeAdmin(check);
  }, [pathname]);
  

  
  return (
    <>
      {
        isIncludeAdmin
          ? <WithAuth Component={
            () => <Component
              {...pageProps}
              isAuth={isAuth}
            />}
            isAuth={isAuth}
          />
          : <Component
            {...pageProps}
            isAuth={isAuth}
          />
      }
    </>
  );
}

export default MyApp
