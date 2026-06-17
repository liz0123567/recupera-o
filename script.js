// Garante a execução segura após o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------------------------------------------
       1. FUNCIONALIDADE DO MODO ESCURO
       ---------------------------------------------------------------------- */
    const btnTheme = document.getElementById("btn-theme");
    
    btnTheme.addEventListener("click", () => {
        // Alterna a classe no body
        document.body.classList.toggle("dark-mode");
        
        // Atualiza o texto do botão de forma acessível
        if (document.body.classList.contains("dark-mode")) {
            btnTheme.textContent = "Alternar Modo Claro";
        } else {
            btnTheme.textContent = "Alternar Modo Escuro";
        }
    });

    /* ----------------------------------------------------------------------
       2. VALIDAÇÃO DO FORMULÁRIO / QUIZ DE FAKE NEWS
       ---------------------------------------------------------------------- */
    const quizForm = document.getElementById("fake-news-quiz");
    const feedbackDiv = document.getElementById("quiz-feedback");

    quizForm.addEventListener("submit", (event) => {
        // Previne o comportamento padrão de recarregar a página
        event.preventDefault();

        // Captura a opção que foi selecionada pelo usuário
        const selectedRadio = document.querySelector('input[name="quiz-question"]:checked');

        // Validação caso o usuário clique em enviar sem marcar nada
        if (!selectedRadio) {
            feedbackDiv.textContent = "Por favor, selecione uma das opções antes de enviar.";
            feedbackDiv.className = "error"; // Remove o 'hidden' e adiciona a classe de erro
            return;
        }

        // Verifica a resposta baseada no valor atribuído no HTML
        if (selectedRadio.value === "correto") {
            feedbackDiv.textContent = "🎉 Resposta Correta! Checar informações em fontes seguras e não espalhar boatos são atitudes essenciais para a Cidadania Digital.";
            feedbackDiv.className = "success";
        } else {
            feedbackDiv.textContent = "❌ Tente novamente! Compartilhar notícias chocantes sem checar a veracidade espalha a desinformação em massa.";
            feedbackDiv.className = "error";
        }
    });
});
