// Este script depende das funções 'fazerLogin' e 'cadastrarUsuario' definidas em app.js

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const authButton = document.getElementById('auth-button');
    const formTitle = document.getElementById('form-title');
    const switchLink = document.getElementById('switch-to-register');
    const errorMessage = document.getElementById('error-message');

    // Variável de estado para alternar entre Login e Cadastro
    let isLoginMode = true;

    // Função para exibir mensagem de erro
    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Função para alternar o formulário
    switchLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        errorMessage.style.display = 'none'; // Limpa erros ao alternar

        if (isLoginMode) {
            formTitle.textContent = 'Entrar na Conta';
            authButton.textContent = 'Entrar';
            switchLink.textContent = 'Criar conta';
            switchLink.closest('p').firstChild.textContent = 'Ainda não tem conta? ';
        } else {
            formTitle.textContent = 'Criar Nova Conta';
            authButton.textContent = 'Cadastrar';
            switchLink.textContent = 'Fazer Login';
            switchLink.closest('p').firstChild.textContent = 'Já possui uma conta? ';
        }
    });

    // Lógica de submissão do formulário
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        errorMessage.style.display = 'none'; // Limpa erros anteriores

        if (password.length < 6) {
            displayError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (isLoginMode) {
            // Lógica de LOGIN
            fazerLogin(email, password)
                .then((userCredential) => {
                    // Login bem-sucedido!
                    alert("Login realizado com sucesso!");
                    window.location.href = 'index.html'; // Redireciona para a página inicial
                })
                .catch((error) => {
                    // Tratamento de erros do Firebase
                    let message = "Erro ao fazer login. Verifique seu e-mail e senha.";
                    if (error.code === 'auth/user-not-found') {
                        message = "Usuário não encontrado.";
                    } else if (error.code === 'auth/wrong-password') {
                        message = "Senha incorreta.";
                    }
                    displayError(message);
                });
        } else {
            // Lógica de CADASTRO
            cadastrarUsuario(email, password)
                .then((userCredential) => {
                    // Cadastro bem-sucedido!
                    alert("Conta criada com sucesso! Faça login para continuar.");
                    isLoginMode = true; // Volta para o modo login
                    switchLink.click();
                })
                .catch((error) => {
                    // Tratamento de erros do Firebase
                    console.error("ERRO FIREBASE AUTH:", error.code, error.message);
                    let message = "Erro ao cadastrar. Tente novamente.";
                    if (error.code === 'auth/email-already-in-use') {
                        message = "Este e-mail já está em uso.";
                    }
                    displayError(message);
                });
        }
    });
});