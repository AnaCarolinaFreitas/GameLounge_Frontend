import React from "react";
import Image from "next/image";
import styles from "../styles/Card.module.css";
import { useRouter } from "next/navigation";

export default function Card({ jogo, onClick }) {
    const router = useRouter();


    const handleClick = () => {
        router.push(`/jogos/${jogo.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
			<Image
				src={
					jogo.image_url
						? `http://localhost:3000/uploads/${jogo.image_url}`
						: "/images/fallback.png"
				}
				alt={jogo.name || "Jogo"}
				width={150}
				height={150}
				className={styles.jogoFoto}
			/>
			<h3 className={styles.jogoNome}>{jogo.name}</h3>
            <div className={styles.genre}>
			<p className={styles.jogoInfo}>{jogo.genre1}</p>
			<p className={styles.jogoInfo}>{jogo.genre2}</p>
            </div>
		</div>
	);
}
