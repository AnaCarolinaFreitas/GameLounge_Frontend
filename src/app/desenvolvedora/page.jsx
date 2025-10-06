import Header from '@/components/Header'
import React from 'react'
import styles from './desenvolvedora.module.css'
import Image from 'next/image'

export default function Desenvolvedora() {
  return (
    <>
    <Header />
     <main className={styles.main}>
        <section className={styles.banner}>
        <h1 className={styles.title}>Sobre a Desenvolvedora</h1>
            <p className={styles.description}>Conheça a desenvolvedora por trás do GameLounge</p>
            </section>
        <section className={styles.container}>

            <div className={styles.profile}>
                <div className={styles.profileImage}>
                <Image src="/images/portrait.png" alt="Retrato pixelado de Ana Carolina Freitas" width={200} height={200} className={styles.avatar} />
                </div>
                <div className={styles.profileInfo}>
                <h2 className={styles.name}>Ana Carolina Freitas</h2>
                <p className={styles.role}>Desenvolvedora Full Stack</p>
                <p className={styles.bio}>
                    Apaixonada por jogos de tabuleiro e tecnologia, criei o GameLounge para conectar pessoas através da diversão e estratégia dos board games. Com experiência em desenvolvimento web, busco sempre criar experiências digitais que aproximem as pessoas.
                </p>
                </div>
                </div>
            <div className={styles.technologies}>
                <h2 className={styles.techTitle}>Tecnologias Utilizadas</h2>
                <ul className={styles.techList}>
                    <li className={styles.techItem}>React</li>
                    <li className={styles.techItem}>Next.js</li>
                    <li className={styles.techItem}>Node.js</li>
                    <li className={styles.techItem}>CSS</li>
                </ul>
            </div>
            <div className={styles.contact}>
                <h2 className={styles.contactTitle}>Contato</h2>
                <p className={styles.description}>Quer saber mais ou entrar em contato? Sinta-se à vontade para me enviar um email ou visitar meu GitHub e Instagram.</p>
                <div className={styles.contactList}>
                <p className={styles.contactInfo}><a href="mailto:anacarolinagarciafreitas@gmail.com">Email</a></p>
                <p className={styles.contactInfo}><a href="https://github.com/AnaCarolinaFreitas" target="_blank">GitHub</a></p>
                <p className={styles.contactInfo}><a href="https://www.instagram.com/anacarolinagfreitas/" target="_blank">Instagram</a></p>
                </div>
            </div>
        </section>
     </main>
    </>
  )
}