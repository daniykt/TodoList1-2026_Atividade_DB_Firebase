# 🔐 TodoList — Firebase Authentication

## 📌 Descrição do Projeto

Esta aplicação foi desenvolvida como parte da atividade prática de **Firebase Authentication**, com o objetivo de implementar um sistema completo de autenticação de usuários em uma aplicação web.

A aplicação permite:

- Cadastro de usuários com e-mail e senha  
- Login de usuários cadastrados  
- Persistência da sessão após recarregar a página  
- Interface dinâmica baseada no estado de autenticação  
- Tratamento de erros com mensagens amigáveis  
- Logout do usuário  

---

## 🚀 Tecnologias Utilizadas

- ⚛️ React + Vite  
- 🔥 Firebase Authentication  
- 🟨 JavaScript (ES6+)  
- 🎨 CSS  

---

## ⚙️ Funcionalidades Implementadas

### 🔹 Cadastro de Usuário
- Formulário com:
  - Email
  - Senha
- Integração com Firebase Authentication
- Tratamento de erros:
  - Senha fraca
  - Email inválido

### 🔹 Login
- Formulário de autenticação
- Validação com Firebase
- Feedback de sucesso ou erro

### 🔹 Gerenciamento de Sessão
- Uso de `onAuthStateChanged`
- Persistência de login após reload

### 🔹 Loading (UX)
- Exibição de loading durante:
  - Verificação de autenticação
  - Login e cadastro

### 🔹 Interface Dinâmica
- **Não autenticado:**
  - Exibe tela de login/cadastro  

- **Autenticado:**
  - Exibe email do usuário  
  - Botão de logout  

### 🔹 Logout
- Encerramento da sessão via Firebase

---

## 📸 Prints da Aplicação

### 🔐 Tela de Login
![Tela de Login](./login.png)

### 📝 Tela de Cadastro
![Tela de Cadastro](./register.png)

### ✅ Usuário Autenticado
![Usuário autenticado](./loggedin.png)

---

## ▶️ Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta
cd seu-repositorio

# Instale as dependências
npm install

# Execute o projeto
npm run dev
