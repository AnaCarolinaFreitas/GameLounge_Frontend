"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoSection}>
                <Image src="/images/logo.png" alt="GameLounge Logo" width={50} height={50} className={styles.logo} />
                <h2 style={{color: '#FFFFFF', margin: '10px 0', fontSize: '18px'}}>GameLounge</h2>
                <p className={styles.text}>A sua próxima jogada começa aqui.</p>
            </div>

            <div className={styles.pages}>
                <h3><a href="/" className={styles.link}>Home</a></h3>
                <h3><a href="/jogos" className={styles.link}>Jogos</a></h3>
                <h3><a href="/sobre" className={styles.link}>NextGame</a></h3>
                <h3><a href="/contato" className={styles.link}>Desenvolvedora</a></h3>
            </div>

            <div className={styles.contact}>
                <h2 className={styles.contactTitle}>Contato</h2>
                <h3 className={styles.contactInfo}><Link href="mailto:ana.c.freitas35@aluno.senai.br">Email</Link></h3>
                <h3 className={styles.contactInfo}><Link href="https://github.com/AnaCarolinaFreitas" target="_blank">GitHub</Link></h3>
                <h3 className={styles.contactInfo}><Link href="https://www.instagram.com/anacarolinagfreitas/" target="_blank">Instagram</Link></h3>
            </div>
        </footer>
    );
}