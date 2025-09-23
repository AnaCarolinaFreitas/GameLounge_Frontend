"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import styles from "./jogos.module.css";
import Image from "next/image";
import Card from "../../components/Card";

export default function page() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Hook para buscar e salvar no SessionStorage
  const buscarJogos = async () => {
    try {
      setLoading(true);
      console.log("🔄 Iniciando busca na API...");

      // 1. Fazer request com axios
      const response = await axios.get("http://localhost:3000/api/games");
      console.log(
        "📡 Resposta da API:",
        response.status,
        response.data.length,
        "jogos"
      );

      // 2. Salvar no SessionStorage
      sessionStorage.setItem("jogos", JSON.stringify(response.data));
      console.log("💾 Dados salvos no SessionStorage");
      console.log("🔍 Veja em: F12 → Application → Session Storage → jogos");

      // 3. Atualizar state
      setJogos(response.data);
      console.log(jogos);

      console.log("✅ State atualizado com", response.data.length, "jogos");
    } catch (error) {
      console.error("❌ Erro na busca:", error.message);
      console.error(
        "🔍 Detalhes:",
        error.response?.status,
        error.response?.statusText
      );
    } finally {
      setLoading(false);
      console.log("🏁 Loading finalizado");
    }
  };

  // 📖 Carregar dados salvos quando componente monta
  useEffect(() => {
    console.log("🚀 Componente montado, verificando SessionStorage...");

    const jogosSalvos = sessionStorage.getItem("jogos");
    if (jogosSalvos) {
      const dados = JSON.parse(jogosSalvos);
      setJogos(dados);
      console.log(
        "📂 Dados carregados do SessionStorage:",
        dados.length,
        "jogos"
      );

      console.log(jogos);
    } else {
      console.log("📭 Nenhum dado encontrado no SessionStorage");
    }
  }, []);

  return (
    <>
      <Header />
      <section className={styles.jogos}>
        <div className={styles.banner}>
          <Image
            src={"/images/conheçabanner.png"}
            alt="Banner"
            width={1200}
            height={300}
            className={styles.bannerImage}
          />
        </div>

        <div className={styles.filterHeader}>
          <input type="text" className={styles.searchInput} />
          <div className={styles.filterButtons}>
            <button
              onClick={buscarJogos}
              disabled={loading}
              className={styles.filterButton}
            >
              {loading ? "Carregando..." : "🔍 Buscar Jogos"}
            </button>
          </div>
        </div>

        <div className={styles.container}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Image
                src="/images/loading.gif"
                alt="Carregando jogos..."
                width={100}
                height={100}
                className={styles.loadingGif}
              />
              <p className={styles.loadingText}>Buscando jogos...</p>
            </div>
          ) : (
            jogos.map((jogo) => <Card key={jogo.id} jogo={jogo} />)
          )}
        </div>
      </section>
    </>
  );
}
