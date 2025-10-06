"use client";
import { useState } from "react";
import perguntas from "@/data/perguntas";
import resultados from "@/data/resultados";
import styles from "./nextgame.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import axios from "axios";

export default function QuizPage() {
  // armazenamos a opção selecionada por índice para cada pergunta
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [resultado, setResultado] = useState(null);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [todosJogos, setTodosJogos] = useState([]);

  const handleResposta = (perguntaIndex, respostaIndex) => {
    const novas = [...respostas];
    novas[perguntaIndex] = respostaIndex; // guardamos o índice selecionado
    setRespostas(novas);
  };

  // calcula o resultado com uma heurística simples baseada em escolhas
  const calcularResultado = () => {
    // se ainda houver respostas nulas, não calcular
    if (respostas.some((r) => r === null)) return;

    // exemplo de soma de pontos: cada opção tem peso (idx + 1)
    const pontos = respostas.reduce((acc, r) => acc + (r + 1), 0);
    console.log("📊 Pontos calculados:", pontos);

    // heurística para escolher uma categoria: mapeamos por intervalos
    // como `resultados` é um objeto com chaves, definimos intervalos fixos
    let chave = null;
    if (pontos <= 8) chave = "festa";
    else if (pontos <= 14) chave = "social";
    else if (pontos <= 20) chave = "criativo";
    else if (pontos <= 26) chave = "estrategico";
    else chave = "aventura";

    const resultadoFinal = resultados[chave];

    setResultado(
      resultadoFinal || { nome: "Nenhum resultado", descricao: "Tente novamente!" }
    );

    // após determinar a chave do perfil, gerar recomendações com base nos jogos salvos
    gerarRecomendacoes(chave);
  };

  // carrega lista de jogos do sessionStorage (preenchida pela página /jogos)
  const carregarJogosSession = () => {
    try {
      const data = sessionStorage.getItem("jogos");
      if (!data) return [];
      const parsed = JSON.parse(data);
      setTodosJogos(parsed);
      return parsed;
    } catch (e) {
      console.warn("Erro ao ler jogos do sessionStorage:", e);
      return [];
    }
  };

  // heurística simples para recomendar 3 jogos com base nas respostas e perfil
  const gerarRecomendacoes = async (perfilChave) => {
    // tentar carregar do sessionStorage
    const jogosSessao = carregarJogosSession() || [];
    let jogosDisponiveis = Array.isArray(jogosSessao) ? jogosSessao.slice() : [];

    // se houver menos de 3 jogos no sessionStorage, buscar na API e mesclar
    if (!jogosDisponiveis || jogosDisponiveis.length < 3) {
      try {
        const resp = await axios.get("http://localhost:3000/api/games");
        if (Array.isArray(resp.data)) {
          // mesclar por id (dedupe)
          const mapa = new Map();
          (jogosDisponiveis || []).forEach((j) => mapa.set(String(j.id), j));
          resp.data.forEach((j) => mapa.set(String(j.id), j));
          jogosDisponiveis = Array.from(mapa.values());
        }
      } catch (e) {
        console.warn("Erro ao buscar jogos da API para recomendações:", e);
      }
    }

    if (!jogosDisponiveis || jogosDisponiveis.length === 0) {
      setRecomendacoes([]);
      return;
    }

    // extrair pistas como antes
    const tamanhoIdx = respostas[0];
    const generoIdx = respostas[1];
    const coopIdx = respostas[2];
    const duracaoIdx = respostas[5];
    const idadeIdx = respostas[4];

    const tamanho = perguntas[0].opcoes[tamanhoIdx] || "";
    const generoEscolhido = perguntas[1].opcoes[generoIdx] || "";
    const cooperacao = perguntas[2].opcoes[coopIdx] || "";
    const duracao = perguntas[5].opcoes[duracaoIdx] || "";
    const idade = perguntas[4].opcoes[idadeIdx] || "";

    const scoreFor = (j) => {
      let s = 0;
      const text = (j.name + " " + (j.genres || "") + " " + (j.description || "")).toLowerCase();
      if (generoEscolhido && text.includes(generoEscolhido.toLowerCase())) s += 3;
      if (perfilChave && text.includes(perfilChave)) s += 2;
      if (text.includes("coop") && cooperacao.toLowerCase().includes("cooper")) s += 2;
      if (tamanho.toLowerCase().includes("pequeno") && j.min_players <= 4) s += 1;
      if (tamanho.toLowerCase().includes("grande") && j.max_players >= 8) s += 1;
      if (duracao.toLowerCase().includes("curto") && (j.duration <= 30 || (j.duration_text || "").includes("30"))) s += 1;
      if (duracao.toLowerCase().includes("longo") && (j.duration >= 60 || (j.duration_text || "").includes("60"))) s += 1;
      if (idade.toLowerCase().includes("crian") && j.min_age && j.min_age <= 12) s += 1;
      return s;
    };

    const scored = jogosDisponiveis.map((j) => ({ jogo: j, score: scoreFor(j) }));
    console.log("🔎 Scores calculados para gerarRecomendacoes:");
    scored.forEach((s) => console.log(s.jogo.name, "=>", s.score));

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const popA = a.jogo.popularity || a.jogo.rating || 0;
      const popB = b.jogo.popularity || b.jogo.rating || 0;
      if (popB !== popA) return popB - popA;
      if (a.jogo.id && b.jogo.id) return String(a.jogo.id).localeCompare(String(b.jogo.id));
      return 0;
    });

    const positivos = scored.filter((s) => s.score > 0).map((s) => s.jogo);
    const escolhidos = [];

    for (const j of positivos) {
      if (!escolhidos.find((e) => e.id === j.id)) escolhidos.push(j);
      if (escolhidos.length === 3) break;
    }

    if (escolhidos.length < 3) {
      for (const s of scored) {
        const j = s.jogo;
        if (!escolhidos.find((e) => e.id === j.id)) {
          escolhidos.push(j);
        }
        if (escolhidos.length === 3) break;
      }
    }

    const uniqueTop = [];
    for (const j of escolhidos) {
      if (!uniqueTop.find((u) => u.id === j.id)) uniqueTop.push(j);
      if (uniqueTop.length === 3) break;
    }

    console.log("✅ Recomendações finais:", uniqueTop.map((j) => j.name));
    setRecomendacoes(uniqueTop);
  };

  const todasRespondidas = respostas.every((r) => r !== null);

  return (
    <>
    <Header />

    <main className={styles.container}>
      <section className={styles.sobreQuiz}>
      <h1 className={styles.titulo}>NextGame</h1>
      <p className={styles.descricao}>
        Responda ao quiz abaixo para receber recomendações personalizadas de jogos de tabuleiro que combinam com o estilo e preferências do seu grupo. <span>Vamos começar a aventura!</span>
      </p>
      </section>
    <section className={styles.quiz}>
      <h1 className={styles.titulo}>Quiz</h1>
      {perguntas.map((p, i) => (
        <div key={p.id} className={styles.pergunta}>
          <p className={styles.textPergunta}>{p.pergunta}</p>
          <div className={styles.opcoes}>
            {p.opcoes.map((opcao, idx) => {
              const selecionada = respostas[i] === idx;
              return (
                <button
                  key={idx}
                  className={selecionada ? styles.opcaoSelecionada : styles.opcao}
                  onClick={() => handleResposta(i, idx)}
                  aria-pressed={selecionada}
                >
                  {opcao}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={calcularResultado}
        className={styles.enviar}
        disabled={!todasRespondidas}
      >
        Ver Resultado
      </button>

      {resultado && (
        <div className={styles.resultado}>
          <h2 className={styles.nome}>{resultado.nome}</h2>
          <p className={styles.descricao}>{resultado.descricao}</p>
        </div>
      )}

      {recomendacoes && recomendacoes.length > 0 && (
        <div className={styles.recomendacoes}>
          <h3>Recomendações</h3>
          <div className={styles.listaRecomendacoes}>
            {recomendacoes.map((jogo) => (
              <div className={styles.jogo} key={jogo.id}>
                <Image
                                src={
                                    jogo.image_url
                                        ? `http://localhost:3000/uploads/${jogo.image_url}`
                                        : "/images/fallback.png"
                                }
                                alt={jogo.name || "Jogo"}
                                width={150}
                                height={150}
                                className={styles.jogoImagem}
                            />
                <strong>{jogo.name  || "Título desconhecido"}</strong>
                {jogo.short_description && <p>{jogo.short_description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
    </main>
     </>
  );
}