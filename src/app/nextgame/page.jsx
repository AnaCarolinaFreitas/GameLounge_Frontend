"use client";
import { useState } from "react";
import perguntas from "@/data/perguntas";
import resultados from "@/data/resultados";
import styles from "./nextgame.module.css";

export default function QuizPage() {
  // armazenamos a opção selecionada por índice para cada pergunta
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [resultado, setResultado] = useState(null);

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
    </div>
  );
}