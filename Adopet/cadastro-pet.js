// NOVO cadastro-pet.js (Sem upload de Storage)

document.addEventListener('DOMContentLoaded', () => {
    const cadastroPetForm = document.getElementById('cadastro-pet-form');
    const authStatus = document.getElementById('auth-status');
    const auth = firebase.auth();
    const db = firebase.firestore();
    // A referência 'storage' não é mais usada

    let currentUserId = null;

    // 1. VERIFICAR AUTENTICAÇÃO (Mantida)
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUserId = user.uid;
            cadastroPetForm.style.display = 'block';
            authStatus.style.display = 'none';
        } else {
            cadastroPetForm.style.display = 'none';
            authStatus.style.display = 'block';
            authStatus.textContent = 'Você precisa estar logado para cadastrar um animal. Por favor, faça login.';
            authStatus.style.color = '#ff4d4f'; 
            authStatus.style.backgroundColor = '#ffe8e8'; 
        }
    });

    // 2. LÓGICA DE SUBMISSÃO DO FORMULÁRIO (Somente Firestore)
    cadastroPetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!currentUserId) {
            alert('Erro: Usuário não autenticado.');
            return;
        }

        // Coleta dos dados
        const nome = document.getElementById('nome').value;
        const especie = document.getElementById('especie').value;
        const idade = document.getElementById('idade').value;
        const cidade = document.getElementById('cidade').value;
        const descricao = document.getElementById('descricao').value;
        // Não precisamos mais do fotoInput

        const submitButton = cadastroPetForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'Aguarde... Salvando dados...'; // Texto alterado

        try {
            // Salvar dados no Firestore
            await db.collection('pets').add({
                nome: nome,
                especie: especie,
                idade: idade,
                cidade: cidade,
                descricao: descricao,
                // Usamos uma imagem de placeholder, pois não há upload
                fotoUrl: 'https://via.placeholder.com/320x300/4db6ac/FFFFFF?text=Pet+Sem+Foto',
                responsavelId: currentUserId,
                dataCadastro: firebase.firestore.FieldValue.serverTimestamp()
            });

            alert('Animal cadastrado com sucesso!');
            cadastroPetForm.reset();

        } catch (error) {
            console.error("Erro ao cadastrar pet:", error);
            alert(`Erro ao cadastrar animal: ${error.message}.`);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Cadastrar Pet';
        }
    });
});