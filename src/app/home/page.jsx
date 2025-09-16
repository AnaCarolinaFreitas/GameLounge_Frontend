import React from 'react'
import Header from '../../components/Header'
import styles from './home.module.css'
import Image from 'next/image'
import FeaturedGames from '../../components/CardHome'

export default function home() {
  return (
    <>
      <Header />
      <section className={styles.home}>
      <div className={styles.homeBanner}>
        <Image src={"/images/tabuleiro.png"} width={800} height={400} alt="Banner" className={styles.banner} />
        <Image src={"/images/peão.png"} width={200} height={150} alt="Peão" className={styles.peao} />
        <Image src={"/images/sombra.png"} width={800} height={400} alt="Sombra" className={styles.bannerGradient} />
      </div>

      <div className={styles.homeText}>
        <Image src={"/images/logo.png"} width={300} height={100} alt="Logo" className={styles.logo}/>
        <div className={styles.textContent}>
          <h1>Bem-vindo ao GameLounge!</h1>
          <p><span className={styles.span}>A sua próxima jogada começa aqui.</span></p>
          <p> O GameLounge é um site interativo sobre jogos de tabuleiro que ajuda os usuários a encontrar o jogo ideal. Ele resolve a dificuldade de escolher o jogo certo, centralizando informações e oferecendo um quiz divertido para recomendar títulos com base no perfil do usuário e do seu grupo.</p>
        </div>
      </div>

      <div className={styles.cardsContainer}>
      <FeaturedGames />
      </div>
      </section>
    </>
  )
}

