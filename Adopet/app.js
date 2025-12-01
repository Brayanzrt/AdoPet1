// SEU ARQUIVO app.js (VERSÃO FINAL DE CONEXÃO)

// Copie e cole suas chaves EXATAS aqui:
const firebaseConfig = {
    apiKey: "AIzaSyCSaULHsjKOtuy5p2BVrdquVIaB-JTeYfc", // <-- SUA CHAVE
    authDomain: "adopet-d2272.firebaseapp.com", // <-- SEU DOMÍNIO
    projectId: "adopet-d2272", // <-- SEU ID
    storageBucket: "adopet-d2272.appspot.com",
    messagingSenderId: "413357643004",
    appId: "1:413357643004:web:e62111d78f34a0b9d8f379",
    // measurementId não é necessário
};

// Inicializa o Firebase (Formato de Namespace V8)
firebase.initializeApp(firebaseConfig);

// Referências aos serviços
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();



// Funções de manipulação do estado de autenticação (RNF - Segurança)
auth.onAuthStateChanged(user => {
    // Trecho do app.js

const linkLogin = document.getElementById('link-login');
const btnLogout = document.getElementById('btn-logout');
const userInfo = document.getElementById('user-info');
const linkCadastroPet = document.getElementById('link-cadastro-pet'); 

    if (user) {
        // Usuário logado
        linkLogin.style.display = 'none';
        btnLogout.style.display = 'inline-block';
        userInfo.style.display = 'inline-block';
        // 🚨 MOSTRAR O LINK DE CADASTRO
        if (linkCadastroPet) {
            linkCadastroPet.style.display = 'inline-block'; 
        }
        userInfo.textContent = `Olá, ${user.email}`; 
    } else {
        // Usuário deslogado
        linkLogin.style.display = 'inline-block';
        btnLogout.style.display = 'none';
        userInfo.style.display = 'none';
        // 🚨 ESCONDER O LINK DE CADASTRO
        if (linkCadastroPet) {
             linkCadastroPet.style.display = 'none'; 
        }
    }
});
// ...

// Lógica de Logout
document.getElementById('btn-logout')?.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Redireciona para a página inicial após o logout
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Erro ao fazer logout:", error);
        alert("Erro ao sair da conta.");
    });
});


// Funções de Autenticação que serão usadas na login.html

/**
 * Cria um novo usuário com e-mail e senha.
 */
function cadastrarUsuario(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

/**
 * Faz login do usuário com e-mail e senha.
 */
function fazerLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}