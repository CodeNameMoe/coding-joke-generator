import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logo from "../public/CJGlogo.png"
import { useEffect, useState } from 'react'

const API_URL = "https://v2.jokeapi.dev/joke/Programming/Any?blacklistFlags=nsfw,racist,sexist,explicit,religious,political&type=twopart"

const BASE_API_URL = "https://v2.jokeapi.dev/joke/Programming/Any?&type=twopart"

export default function Home() {
  const [jokeA, setJokeA] = useState("")
  const [jokeB, setJokeB] = useState("")
  const [isToggled, setIsToggled] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [refresh, setRefresh] = useState(false)
  let on = true;
  useEffect(() => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => setJokeA(data.setup) & setJokeB(data.delivery) );
  }, [refresh])
  function handleClick(){
    setIsToggled(!isToggled)
    setHideButton(!hideButton)
  }
  function reset(){
    setRefresh(!refresh)
    setIsToggled(!isToggled)
    setHideButton(!hideButton)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Joke Generator</title>
        <meta name="description" content="Take a break and have a 😆" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.logo}>
        <Image
           src={logo}
           alt="logo"
           width={500}
           height={250}
        />
      </header>
      <section className={styles.jokeBox} >
        <div id={styles.setup} className={styles.text} >
          <p>
          {jokeA}
          </p>
        </div>
        {isToggled && <div id={styles.delivery} className={`${styles.text} ${styles.toggle} `} >
         <p>
         {jokeB}
         </p>
        </div>}
      </section>
      <div className={styles.btnBox}>
        {!hideButton && <button className={styles.btn} id={styles.tellMe}  onClick={handleClick}>
          Tell me!
        </button> }
        {hideButton && <button className={styles.btn} id={styles.another} onClick={reset} >
          Tell me another!
        </button>}
      </div>
      
    </div>
  )
}
