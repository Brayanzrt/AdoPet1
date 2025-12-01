
// theme.js

document.addEventListener('DOMContentLoaded', () => {
    // Estas referências precisam existir no HTML para o botão funcionar
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Se o botão não for encontrado, a lógica para aqui
    if (!themeToggle) {
        console.error("ERRO: Botão com ID 'theme-toggle' não encontrado.");
        return;
    }

    // Função para aplicar o tema com base no localStorage
    function applyTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Mudar Tema'; // Ícone Sol
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙 Mudar Tema'; // Ícone Lua
        }
    }

    // Aplica o tema imediatamente ao carregar a página
    applyTheme();

    // Listener para o clique no botão
    themeToggle.addEventListener('click', () => {
        // Alterna entre os modos
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        // Atualiza o texto/ícone do botão
        applyTheme();
    });
});