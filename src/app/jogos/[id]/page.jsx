"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Header from "../../../components/Header";
import styles from "./jogoid.module.css";



export default function JogoDetalhes() {
     const { id } = useParams();
     const router = useRouter();
    const [jogo, setJogo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const voltarParaJogos = () => {
        router.push('/jogos');
    };
    
    useEffect(() => {
        const fetchJogo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/games/${id}`);
                setJogo(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do jogo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJogo();
    }, [id]);

    if (loading) {
        return <Image src="/images/loading.gif" alt="Carregando..." width={100} height={100} className={styles.loading} />;
    }
    if (!jogo) {
        return <p>Jogo não encontrado.</p>;
    }


return (
        <>
            <Header />
            <section className={styles.container}>
                <button onClick={voltarParaJogos} className={styles.backButton}>
                    ← Voltar para Jogos
                </button>
                
                <div className={styles.jogoInfo}>
                    <div className={styles.jogoImageAndRating}>
                    <div className={styles.jogoImageContainer}>
                            <Image
                                src={
                                    jogo.image_url
                                        ? `http://localhost:3000/uploads/${jogo.image_url}`
                                        : "/images/fallback.png"
                                }
                                alt={jogo.name || "Jogo"}
                                width={300}
                                height={300}
                                className={styles.jogoImagem}
                            />
                </div>

                <div className={styles.jogoRating}>
                    <Image
                        src="/images/rating.png"
                        alt="Rating"
                        width={50}
                        height={50}
                        className={styles.ratingImage}
                    />
                    <h2 className={styles.ratingValue}>{jogo.rating}/5</h2>
                </div>

                <p className={styles.classificação}>Classificação: {jogo.age_rating}</p>
                <p className={styles.players}>Duração partida: {jogo.duration}</p>
                <p className={styles.players}>Quantidade Jogadores: {jogo.num_players}</p>
                </div>
                

                <div className={styles.jogoDetails}>
                    <h1 className={styles.jogoNome}>{jogo.name}</h1>
                    <p className={styles.description}>{jogo.description}</p>

                    <h1 className={styles.rules}>Regras Básicas</h1>
                    <div className={styles.rulesContainer}>
                        <p className={styles.mechanics}><span>Mecânicas: </span>{jogo.mechanics}</p>
                        <p className={styles.rulesText}><span>Regras: </span>{jogo.rules}</p>
                    </div>

                   <h1 className={styles.commentsTitle}>O que os jogadores acham?</h1>
                    <div className={styles.commentsSection}>
                        <p className={styles.comment}>{jogo.comment1}</p>
                        <p className={styles.comment}>{jogo.comment2}</p>
                    </div>

                </div>
                </div>
            </section>
            </>
    );
}