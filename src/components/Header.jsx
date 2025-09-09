import React from 'react'
import Image from 'next/image'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
       <Image src={"/images/logo.png"} alt="Logo" width={100} height={50} className={styles.logo}/>
       <div className={styles.title}>
        <h1 className={styles.name}>GameLounge</h1>
        <p className={styles.slogan}>A sua próxima jogada começa aqui.</p>
       </div>
    </header> 
  )
}
