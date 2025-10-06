"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className={styles.container}>
                <div className={styles.messageBox}>
                    <h1 className={styles.errorCode}>ERROR 404</h1>
                    <h2 className={styles.title}>PÁGINA NÃO ENCONTRADA</h2>

                    <button 
                        onClick={() => router.push('/')}
                        className={styles.button}
                    >
                        ← VOLTAR AO INÍCIO
                    </button>
                </div>
            </div>
    );
}
