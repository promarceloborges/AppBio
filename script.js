let perguntas = {
    organizacao: [
        { pergunta: "Qual é a menor unidade funcional da vida?", opcoes: ["Célula", "Tecido", "Órgão"], resposta: "Célula" },
        { pergunta: "Qual nível de organização está acima do tecido?", opcoes: ["Órgão", "Célula", "Sistema"], resposta: "Órgão" }
    ],
    celulas: [
        { pergunta: "Quem descobriu a célula?", opcoes: ["Robert Hooke", "Darwin", "Pasteur"], resposta: "Robert Hooke" },
        { pergunta: "Qual organela produz energia na célula?", opcoes: ["Mitocôndria", "Ribossomo", "Lisossomo"], resposta: "Mitocôndria" }
    ],
    conhecimento: [
        { pergunta: "Qual o primeiro passo do método científico?", opcoes: ["Observação", "Hipótese", "Experimento"], resposta: "Observação" },
        { pergunta: "Quem formulou a teoria da evolução?", opcoes: ["Darwin", "Pasteur", "Hooke"], resposta: "Darwin" }
    ]
};

let temaAtual, indicePergunta, pontuacao, tempoRestante, intervalo;

function iniciarQuiz(tema) {
    temaAtual = tema;
    indicePergunta = 0;
    pontuacao = 0;
    document.getElementById("menu").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    carregarPergunta();
}

function carregarPergunta() {
    if (indicePergunta < perguntas[temaAtual].length) {
        let perguntaObj = perguntas[temaAtual][indicePergunta];
        document.getElementById("pergunta").innerText = perguntaObj.pergunta;
        let opcoesHTML = "";
        perguntaObj.opcoes.forEach(op => {
            opcoesHTML += `<button onclick="verificarResposta('${op}')">${op}</button>`;
        });
        document.getElementById("opcoes").innerHTML = opcoesHTML;
        tempoRestante = 15;
        document.getElementById("tempo").innerText = `Tempo: ${tempoRestante}s`;
        intervalo = setInterval(contarTempo, 1000);
    } else {
        finalizarQuiz();
    }
}

function contarTempo() {
    tempoRestante--;
    document.getElementById("tempo").innerText = `Tempo: ${tempoRestante}s`;
    if (tempoRestante === 0) {
        clearInterval(intervalo);
        proximaPergunta();
    }
}

function verificarResposta(opcao) {
    clearInterval(intervalo);
    let perguntaObj = perguntas[temaAtual][indicePergunta];
    if (opcao === perguntaObj.resposta) {
        pontuacao += 10;
    }
    proximaPergunta();
}

function proximaPergunta() {
    indicePergunta++;
    carregarPergunta();
}

function finalizarQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultado").style.display = "block";
    document.getElementById("pontuacao").innerText = `Sua pontuação: ${pontuacao}`;
    salvarRanking();
}

function salvarRanking() {
    let ranking = localStorage.getItem("ranking") ? JSON.parse(localStorage.getItem("ranking")) : [];
    ranking.push(pontuacao);
    ranking.sort((a, b) => b - a);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function compartilhar() {
    let mensagem = `Fiz ${pontuacao} pontos no Quiz de Biologia do Profº Marcelo Borges! Tente me superar!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`, "_blank");
}

function reiniciarQuiz() {
    document.getElementById("resultado").style.display = "none";
    document.getElementById("menu").style.display = "block";
}
