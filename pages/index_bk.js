import Head from 'next/head'
import styles from '../styles/Home.module.css'

import axios from 'axios';
import {useState} from "react";

export default function Home() {

  const [userSession, setUserSession] = useState(null);

  // axios.get('http://localhost:1337/api/br-sessions').then(response => {
  //   setUserSession(response.data.data);
  //   console.log(userSession);
  // });

  return (
    <div className={styles.container}>
      <Head>
        <title>Breathing APP</title>
        <meta name="description" content="WH breathing technique" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <h1 className={styles.title}>
          BREATH
        </h1>
      </>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        Based on the <a href="https://www.wimhofmethod.com/">Wim Hof Method</a>
      </footer>
    </div>
  )
}
