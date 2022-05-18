import React from "react"
import firebase from "./../../config/firebase.js";
import { useRouter } from "next/router"

export default function Admin({ isAuth }) {
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target.children[0].children[1]
    const password = e.target.children[1].children[1]
    try {
      await firebase
        ?.auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
    }
  }

  if (isAuth) {
    router.push("/admin/dashboard")
  }

  return (
    <div className='admin_wrapper'>
      <form onSubmit={submit}>
        <label>
          <div>Почта</div>
          <input required type={"email"} />
        </label>
        <label>
          <div>Пароль</div>
          <input required type={"password"} />
        </label>
        <div className='btn-wrapper'>
          <button className='btn'>
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}
