import React from "react";
import styles from "../styles/FeaturedGames.module.css";
import Image from "next/image";

const FeaturedGames = () => {
  return (
    <div className={styles.container}>
      <h2>Jogos Queridinhos</h2>
      <div className={styles.cardsContainer}>
        <div className={styles.card1}>
          <Image
            src={"/images/card1.png"}
            width={250}
            height={150}
            alt="Card com o jogo Jenga"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.card2}>
          <Image
            src={"/images/card2.png"}
            width={250}
            height={150}
            alt="Card com o jogo Uno"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.card3}>
          <Image
            src={"/images/card3.png"}
            width={250}
            height={150}
            alt="Card com o jogo Dooble"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.card4}>
          <Image
            src={"/images/card4.png"}
            width={250}
            height={150}
            alt="Card com o jogo monopoly"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.card5}>
          <Image
            src={"/images/card5.png"}
            width={250}
            height={150}
            alt="Card com o jogo Dixit"
            className={styles.cardImage}
          />
        </div>
      </div>
      <a href="jogos" className={styles.link}><button className={styles.exploreButton}>Explore mais jogos</button></a>
    </div>
  );
};

export default FeaturedGames;
