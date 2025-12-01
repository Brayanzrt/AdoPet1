// home.js

document.addEventListener('DOMContentLoaded', () => {
    // 🚨 ATENÇÃO: O ID abaixo deve bater com o HTML acima 🚨
    const listaAnimaisDiv = document.getElementById('lista-animais'); 
    
    // Certifique-se de que a referência ao Firestore (db) está disponível a partir de app.js
    const db = firebase.firestore(); 

    function criarCardAnimal(pet) {
        const nome = pet.nome || 'Pet Sem Nome';
        const especie = pet.especie || 'Outros';
        const cidade = pet.cidade || 'Não informada';
        const idade = pet.idade || 'Idade Desconhecida';
        // Usando o placeholder
        const fotoUrl = pet.fotoUrl || 'https://via.placeholder.com/320x300/4db6ac/FFFFFF?text=Pet+Sem+Foto'; 
        
        const whatsappLink = `https://wa.me/5511941346925?text=Olá, tenho interesse em adotar o(a) ${nome} (${especie}) que vi no AdoPet.`;

        return `
            <div class="animal-card">
                <img src="${fotoUrl}" alt="Foto de ${nome}">
                <span class="tag-especie">${especie.toUpperCase()}</span>
                <div class="animal-info">
                    <h3>${nome}</h3>
                    <p>Idade: ${idade} | Cidade: ${cidade}</p>
                    <a href="${whatsappLink}" target="_blank" class="btn-adotar">Quero Adotar (WhatsApp)</a>
                </div>
            </div>
        `;
    }

    async function carregarAnimais(especie = '', cidade = '') {
        // Mostra a mensagem de carregamento inicial
        if (listaAnimaisDiv) {
             listaAnimaisDiv.innerHTML = '<p>Buscando pets disponíveis...</p>';
        } else {
             // Caso o ID não exista (erro no HTML)
             console.error("ERRO: Elemento com ID 'lista-animais' não encontrado.");
             return; 
        }

        let query = db.collection('pets').orderBy('dataCadastro', 'desc');

        if (especie) {
            query = query.where('especie', '==', especie);
        }
        if (cidade) {
            query = query.where('cidade', '==', cidade);
        }

        try {
            const snapshot = await query.get();

            if (snapshot.empty) {
                listaAnimaisDiv.innerHTML = '<p>Nenhum animal encontrado.</p>';
                return;
            }

            let cardsHTML = '';
            snapshot.forEach(doc => {
                const petData = doc.data();
                cardsHTML += criarCardAnimal(petData);
            });
            
            listaAnimaisDiv.innerHTML = cardsHTML; // Injeta os cards no HTML

        } catch (error) {
            console.error("Erro ao carregar animais do Firestore:", error);
            listaAnimaisDiv.innerHTML = '<p class="error-message">Erro ao carregar a lista de adoção.</p>';
        }
    }

    // Chama a função ao carregar a página
    carregarAnimais(); 
    
    // Lógica dos filtros (mantida)
    document.getElementById('filtro-especie')?.addEventListener('change', () => {
        carregarAnimais(document.getElementById('filtro-especie').value, document.getElementById('filtro-cidade').value);
    });
    // ... e outros listeners de filtro ...
});