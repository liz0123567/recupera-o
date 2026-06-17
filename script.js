document.addEventListener("DOMContentLoaded", () => {

    /* --- DECLAÇÃO DO CONTROLE DO MODO ESCURO --- */
    const btnTheme = document.getElementById("btn-theme");
    if (btnTheme) {
        btnTheme.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                btnTheme.textContent = "Mudar para Modo Claro ☀️";
            } else {
                btnTheme.textContent = "Mudar para Modo Escuro 🌙";
            }
        });
    }

    /* --- BANCO DE DADOS DO QUIZ --- */
    const perguntasQuiz = [
        {
            pergunta: "Você recebeu um vídeo de um cantor famoso recomendando um site suspeito com descontos malucos. O que fazer?",
            opcoes: [
                "Comprar na hora! Se o famoso disse no vídeo, deve ser real.",
                "Desconfiar. Vídeos promocionais bizarros de famosos podem ser deepfakes. Melhor pesquisar no site oficial."
            ],
            correta: 1,
            feedbackSucesso: "Incrível! 💖 Desconfiar sempre de ofertas mágicas usando celebridades é a melhor postura.",
            feedbackErro: "Atenção! 💔 Criminosos usam rostos de famosos gerados por IA para enganar as pessoas."
        },
        {
            pergunta: "Qual dessas opções é um sinal comum que ajuda a detectar uma Deepfake de vídeo?",
            opcoes: [
                "Piscadas de olhos muito raras, movimentos de boca fora do ritmo e iluminação estranha.",
                "O vídeo ter alta definição e música de fundo bonita."
            ],
            correta: 0,
            feedbackSucesso: "Excelente detetive! 🕵️‍♀️ Esses pequenos detalhes físicos entregam a manipulação da IA.",
            feedbackErro: "Ops! 💔 A qualidade do vídeo em si não entrega o erro, mas sim as falhas de sincronia física."
        },
        {
            pergunta: "Você leu uma notícia super alarmante no grupo da família que parece falsa. O que você faz antes de enviar para os amigos?",
            opcoes: [
                "Compartilho imediatamente para alertá-los o quanto antes.",
                "Pesquiso em um buscador de confiança ou sites de checagem para ver se é real."
            ],
            correta: 1,
            feedbackSucesso: "Perfeito! ✨ Checar antes de compartilhar é a regra de ouro da nossa cidadania na internet.",
            feedbackErro: "Cuidado! 💔 Compartilhar boatos causa pânico e espalha mentiras desnecessárias."
        },
        {
            pergunta: "Qual o perigo mais sério das deepfakes e fake news geradas por Inteligência Artificial na sociedade?",
            opcoes: [
                "Deixar as pessoas confusas, prejudicar reputações e obter decisões induzidas por mentiras.",
                "Deixar a internet com carregamento mais lento de fotos."
            ],
            correta: 0,
            feedbackSucesso: "Exato! 🎯 A desinformação automatizada afeta diretamente a democracia e a paz social.",
            feedbackErro: "Ih, não é isso! 💔 O perigo é muito mais grave e envolve a segurança social."
        },
        {
            pergunta: "Para se manter seguro de fraudes por IA, qual é um bom comportamento diário na internet?",
            opcoes: [
                "Não usar redes sociais de jeito nenhum.",
                "Configurar perfis de redes no modo privado, não adicionar estranhos e usar senhas fortes."
            ],
            correta: 1,
            feedbackSucesso: "Isso mesmo! ⭐ Proteger sua privacidade é uma barreira forte contra o uso indevido de dados.",
            feedbackErro: "Não precisa se isolar! 💔 Mas manter boas práticas de segurança garante uma navegação tranquila."
        }
    ];

    /* --- CAPTURA DE ELEMENTOS DO QUIZ --- */
    let perguntaAtualIndex = 0;
    let totalAcertos = 0;
    let jaRespondeu = false;

    const textoPergunta = document.getElementById("texto-pergunta");
    const gradeOpcoes = document.getElementById("grade-opcoes");
    const feedbackQuiz = document.getElementById("feedback-quiz");
    const feedbackMensagem = document.getElementById("feedback-mensagem");
    const btnProxima = document.getElementById("btn-proxima");
    const contadorAcertos = document.getElementById("contador-acertos");
    const quizPerguntaNum = document.getElementById("quiz-pergunta-num");
    const progressoQuiz = document.getElementById("progresso-quiz");
    
    const areaQuiz = document.getElementById("quiz-area");
    const painelPlacar = document.querySelector(".painel-placar");
    const barraProgressoContainer = document.querySelector(".barra-progresso-container");
    const telaFinalQuiz = document.getElementById("tela-final-quiz");
    const pontosFinais = document.getElementById("pontos-finais");
    const rankingResultado = document.getElementById("ranking-resultado");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    function iniciarQuiz() {
        perguntaAtualIndex = 0;
        totalAcertos = 0;
        jaRespondeu = false;
        
        if(contadorAcertos) contadorAcertos.textContent = totalAcertos;
        if(areaQuiz) areaQuiz.classList.remove("hidden");
        if(painelPlacar) painelPlacar.classList.remove("hidden");
        if(barraProgressoContainer) barraProgressoContainer.classList.remove("hidden");
        if(telaFinalQuiz) telaFinalQuiz.classList.add("hidden");
        
        carregarPergunta();
    }

    function carregarPergunta() {
        jaRespondeu = false;
        if(feedbackQuiz) feedbackQuiz.classList.add("hidden");
        if(gradeOpcoes) gradeOpcoes.innerHTML = "";

        if(quizPerguntaNum) quizPerguntaNum.textContent = perguntaAtualIndex + 1;
        const progressoPercentual = (perguntaAtualIndex / perguntasQuiz.length) * 100;
        if(progressoQuiz) progressoQuiz.style.width = `${progressoPercentual}%`;

        const dadosPergunta = perguntasQuiz[perguntaAtualIndex];
        if(textoPergunta) textoPergunta.textContent = dadosPergunta.pergunta;

        dadosPergunta.opcoes.forEach((opcao, index) => {
            const botao = document.createElement("button");
            botao.classList.add("botao-opcao");
            botao.textContent = opcao;
            botao.addEventListener("click", () => selecionarResposta(index, botao));
            if(gradeOpcoes) gradeOpcoes.appendChild(botao);
        });
    }

    function selecionarResposta(opcaoSelecionadaIndex, botaoClicado) {
        if (jaRespondeu) return;
        jaRespondeu = true;

        const dadosPergunta = perguntasQuiz[perguntaAtualIndex];
        const botoes = gradeOpcoes.querySelectorAll(".botao-opcao");

        if (opcaoSelecionadaIndex === dadosPergunta.correta) {
            botaoClicado.classList.add("correta");
            totalAcertos++;
            if(contadorAcertos) contadorAcertos.textContent = totalAcertos;
            if(feedbackMensagem) {
                feedbackMensagem.textContent = dadosPergunta.feedbackSucesso;
                feedbackMensagem.style.color = "#155724";
            }
        } else {
            botaoClicado.classList.add("errada");
            if(botoes[dadosPergunta.correta]) botoes[dadosPergunta.correta].classList.add("correta");
            if(feedbackMensagem) {
                feedbackMensagem.textContent = dadosPergunta.feedbackErro;
                feedbackMensagem.style.color = "#721c24";
            }
        }

        if(feedbackQuiz) feedbackQuiz.classList.remove("hidden");
        if(btnProxima) {
            btnProxima.textContent = perguntaAtualIndex === perguntasQuiz.length - 1 ? "Ver Resultado Final 🎉" : "Avançar ➡️";
        }
    }

    if(btnProxima) {
        btnProxima.addEventListener("click", () => {
            if (perguntaAtualIndex < perguntasQuiz.length - 1) {
                perguntaAtualIndex++;
                carregarPergunta();
            } else {
                mostrarTelaFinal();
            }
        });
    }

    function mostrarTelaFinal() {
        if(areaQuiz) areaQuiz.classList.add("hidden");
        if(painelPlacar) painelPlacar.classList.add("hidden");
        if(barraProgressoContainer) barraProgressoContainer.classList.add("hidden");
        if(telaFinalQuiz) telaFinalQuiz.classList.remove("hidden");
        if(pontosFinais) pontosFinais.textContent = totalAcertos;

        let rankText = "";
        if (totalAcertos === 5) {
            rankText = "👑 Super Herói da Internet ✨";
        } else if (totalAcertos >= 3) {
            rankText = "🕵️‍♀️ Detetive Esperto 🌸";
        } else {
            rankText = "🌱 Aprendiz Digital 🍼";
        }
        if(rankingResultado) rankingResultado.textContent = `Ranking: ${rankText}`;
    }

    if(btnReiniciar) btnReiniciar.addEventListener("click", iniciarQuiz);

    iniciarQuiz();

    /* --- CAPTURA E VALIDAÇÃO DO FORMULÁRIO --- */
    const formContato = document.getElementById("form-contato-fofo");
    const alertaContato = document.getElementById("alerta-contato");

    if(formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();
            const nomeInserido = document.getElementById("nome").value;
            
            if(alertaContato) {
                alertaContato.textContent = `💖 Oba, ${nomeInserido}! Recebemos seu alerta. Nossos tutores estão correndo para verificar!`;
                alertaContato.classList.remove("hidden");
                alertaContato.style.color = "var(--pink-soft)";
            }
            formContato.reset();
            setTimeout(() => {
                if(alertaContato) alertaContato.classList.add("hidden");
            }, 5000);
        });
    }
});
