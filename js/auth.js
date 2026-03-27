authForm.onsubmit = function (event){
    showItem(loading)
    event.preventDefault()
    if(authForm.submitAuthForm.innerHTML == 'Acessar'){
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, 
            authForm.password.value ).catch(function (error) {
                console.log('Falha no Acesso')
                console.log(error)
            })
    } else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, 
            authForm.password.value ).catch(function (error) {
                console.log('Falha no Cadastro')
                console.log(error)
            })
    }
}
//Função que centraliza e trata autenticação
firebase.auth().onAuthStateChanged( function (user){
    hideItem(loading)
    if (user) {
        showUserContent(user)
    } else {
        showAuth()
    }
})

// Função que permitir o usuario sair da conta
function signOut() {
firebase.auth().signOut().catch(function (error) {
    console.log('Falha ao sair da conta')
    console.log(error)
    })
}