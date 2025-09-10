import React from 'react'
import Header from '../../components/Header'
import styles from './home.module.css'
import Image from 'next/image'

export default function home() {
  return (
    <>
      <Header />
      <section className={styles.home}>
      <div className={styles.homeBanner}>
        <Image src={"/images/tabuleiro.png"} width={800} height={400} alt="Banner" className={styles.banner} />
      </div>
      </section>
    </>
  )
}
