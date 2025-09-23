"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import styles from "./jogos.module.css";
import Image from "next/image";
import Card from "../../components/Card";
import { Pagination } from 'antd';

export default function page() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroIdade, setFiltroIdade] = useState("");
  const [filtroJogadores, setFiltroJogadores] = useState("");
  const [filtroDuracao, setFiltroDuracao] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const filtrarJogos = async () => {
  try {
    setLoading(true);

    // Monta a query string dinamicamente
    const params = new URLSearchParams();
    if (filtroNome) params.append("name", filtroNome);
    if (filtroIdade) params.append("age_rating", filtroIdade);
    if (filtroJogadores) params.append("num_players", filtroJogadores);
    if (filtroDuracao) params.append("duration", filtroDuracao);
    if (filtroGenero) {
      params.append("genre1", filtroGenero);
      params.append("genre2", filtroGenero);
    }

    const url = `http://localhost:3000/api/games?${params.toString()}`;
    console.log("📡 URL da requisição:", url);

    const response = await axios.get(url);

    // Salvar no sessionStorage
    sessionStorage.setItem("jogos", JSON.stringify(response.data));
    setJogos(response.data);

    console.log("✅ Jogos filtrados:", response.data.length);
  } catch (error) {
    console.error("❌ Erro ao filtrar:", error.message);
  } finally {
    setLoading(false);
  }
};

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
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />

          <div className={styles.filtersSection}>
            <select
              value={filtroIdade}
              onChange={(e) => setFiltroIdade(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Idade mínima</option>
              <option value="5">6+</option>
              <option value="8">8+</option>
              <option value="10">10+</option>
              <option value="12">12+</option>
              <option value="14">14+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>

            <select
              value={filtroJogadores}
              onChange={(e) => setFiltroJogadores(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Nº de jogadores</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7+">7+</option>
            </select>

            <select
              value={filtroDuracao}
              onChange={(e) => setFiltroDuracao(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Duração</option>
              <option value="15">Até 15 min</option>
              <option value="30">Até 30 min</option>
              <option value="60">Até 1h</option>
              <option value="90">Até 1h30</option>
              <option value="120">Até 2h</option>
              <option value="120+">Mais de 2h</option>
            </select>

            <select
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Gênero</option>
              <option value="Cartas">Cartas</option>
              <option value="Aventura">Aventura</option>
              <option value="Tabuleiro">Tabuleiro</option>
              <option value="Estrategia">Estratégia</option>
              <option value="Festa">Festa</option>
              <option value="Familiar">Família</option>
              <option value="Cooperativo">Cooperativo</option>
              <option value="Misterio">Mistério</option>
              <option value="Criatividade">Criatividade</option>
              <option value="Social">Social</option>
              <option value="Investigacao">Investigação</option>
              <option value="Palavras">Palavras</option>
              <option value="Dados">Dados</option>
              <option value="Classico">Clássico</option>
            </select>
          </div>

          <div className={styles.filterButtons}>
            <button
              onClick={filtrarJogos}
              disabled={loading}
              className={styles.filterButton}
            >
              {loading ? "Carregando..." : "Buscar 🎲"}
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
            jogos
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((jogos, index) => (
                <Card key={jogos.id} jogo={jogos} />
              ))
          )}
        </div>

        <Pagination
        current={currentPage}
        total={jogos.length}
        pageSize={pageSize}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
        onChange={(page, size) => setCurrentPage(page)}
        onShowSizeChange={(current, size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        className={styles.pagination}
      />
      </section>
    </>
  );
}
