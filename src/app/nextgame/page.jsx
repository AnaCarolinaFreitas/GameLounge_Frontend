"use client";
import { useState } from "react";
import perguntas from "@/data/perguntas";
import resultados from "@/data/resultados";
import styles from "./nextgame.module.css";

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
  const gerarRecomendacoes = (perfilChave) => {
    const jogos = carregarJogosSession();
    if (!jogos || jogos.length === 0) {
      setRecomendacoes([]);
      return;
    }

    // extrair algumas pistas das respostas: tamanho do grupo (pergunta 1), genero (2), cooperativo(3), duracao(6), faixa etaria(5)
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

    // função de pontuação simples por correspondência de texto em campos comuns dos jogos
    const scoreFor = (j) => {
      let s = 0;
      const text = (j.name + " " + (j.genres || "") + " " + (j.description || "")).toLowerCase();
      if (text.includes(generoEscolhido.toLowerCase())) s += 3;
      if (text.includes(perfilChave)) s += 2; // perfil (festa/social/etc)
      if (text.includes("coop") && cooperacao.toLowerCase().includes("cooper")) s += 2;
      if (tamanho.toLowerCase().includes("pequeno") && j.min_players <= 4) s += 1;
      if (tamanho.toLowerCase().includes("grande") && j.max_players >= 8) s += 1;
      // duracao tentativa: procurar minutos em duração/description
      if (duracao.toLowerCase().includes("curto") && (j.duration <= 30 || (j.duration_text || "").includes("30"))) s += 1;
      if (duracao.toLowerCase().includes("longo") && (j.duration >= 60 || (j.duration_text || "").includes("60"))) s += 1;
      // idade
      if (idade.toLowerCase().includes("crian") && j.min_age && j.min_age <= 12) s += 1;
      return s;
    };

    const scored = jogos.map((j) => ({ jogo: j, score: scoreFor(j) }));
    scored.sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 3).map((s) => s.jogo);
    setRecomendacoes(top3);
  };

  const todasRespondidas = respostas.every((r) => r !== null);

  return (
    <div className={styles.quiz}>
      <h1>Quiz</h1>
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
          <h2>{resultado.nome}</h2>
          <p>{resultado.descricao}</p>
        </div>
      )}

      {recomendacoes && recomendacoes.length > 0 && (
        <div className={styles.recomendacoes}>
          <h3>Recomendações</h3>
          <ul>
            {recomendacoes.map((j) => (
              <li key={j.id}>
                <strong>{j.name || j.title || "Título desconhecido"}</strong>
                {j.short_description && <p>{j.short_description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}