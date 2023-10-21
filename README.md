## **Visão Geral:**

A API "CódiGourmet" representa o coração de um projeto acadêmico apaixonante, criado para atender às necessidades dos entusiastas da culinária. Desenvolvido com o objetivo de fornecer uma plataforma onde amantes da cozinha possam compartilhar suas receitas favoritas e explorar uma infinidade de outras criações culinárias, o aplicativo CódiGourmet está destinado a se tornar um recurso essencial para todos os amantes da arte de cozinhar.

Este documento tem como objetivo orientar os desenvolvedores no uso eficiente e eficaz da API CódiGourmet. Aqui, você encontrará informações detalhadas sobre como acessar e utilizar os recursos oferecidos pela API, para que você possa integrá-los em seus próprios aplicativos, estendendo as fronteiras da culinária digital.

Nossa API foi projetada para tornar a vida dos desenvolvedores mais simples, permitindo que você aproveite todo o potencial do CódiGourmet e crie experiências culinárias únicas para sua audiência. Seja bem-vindo à jornada de descoberta e inovação na culinária digital com a API CódiGourmet. Vamos começar a explorar todas as deliciosas possibilidades!

### **Recursos Principais:**

- **Gerenciamento de Conta:** Crie e gerencie sua conta de forma segura, sem custos. Tenha controle total sobre seus dados, permitindo a visualização, edição e exclusão de informações.
- **Funcionalidades Culinárias:** Desperte seu talento na cozinha! Crie, armazene e compartilhe suas receitas exclusivas. Guarde suas favoritas e personalize as receitas de acordo com seu gosto.

A API "CódiGourmet" foi desenvolvida com a simplicidade e flexibilidade em mente, oferecendo uma experiência agradável aos amantes da culinária.

## Endpoints:

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/usuarios**

- **Método suportados:** GET, POST, PUT e DELETE
- **Parâmetros de consulta:** para usar os métodos GET, PUT, e DELETE é necessário passar o id do usuário para executar as respectivas operações de “Ler dados”, “Alterar dados” e “Excluir dados”. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/usuarios/id**
- **Exemplos de código:**
    - GET
        
        ```jsx
        async function buscarUsuario(id, token) {
        
            try {
        
                // Essa rota  de API é privada, portanto é necessário passar o token de autorização
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/usuarios/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - POST
        
        ```jsx
        async function cadastro(nome, sobrenome, email, senha){
            
            try {
        
                const usuario = {nome, sobrenome, email, senha}
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/usuarios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        }
        ```
        
    - PUT
        
        ```jsx
        async function editar(nome, sobrenome){
            
            try {
        
                const usuario = {nome, sobrenome}
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/usuarios`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(usuario)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        }
        ```
        
    - DELETE
        
        ```jsx
        async function excluirUsuario(id, token) {
        
            try {
        
                const requisicao = await fetch(`${url}${endpointUsuarios}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
- **Respostas da API:**
    - GET - Buscar dados do usuário (É necessário estar autenticado para realizar a busca).
        
        ```json
        {
            "msg": "OK",
            "status": "success",
            "dados": {
                "id": "652e5cc6bf553aded1bbef46",
                "nome": "Nathan",
                "sobrenome": "De Sousa Barros",
                "email": "nathansousa0809@gmail.com",
                "receitasFavoritas": [
                    "652e5fe9bf553aded1bbef54",
                    "652e602dbf553aded1bbef58"
                ]
            }
        }
        ```
        
    - POST - Cadastrar um Usuário
        
        ```json
        {
            "msg": "Usuário cadastrado com sucesso!",
            "status": "success"
        }
        ```
        
    - PUT - Editar dados do usuário (É necessário estar autenticado para realizar essa tarefa).
        
        ```json
        {
            "msg": "Usuário editado com sucesso!",
            "status": "success"
        }
        ```
        
    - DELETE - Deletar conta (É necessário estar autenticado para realizar essa tarefa).
        
        ```json
        {
            "msg": "Usuário deletado com sucesso",
            "status": "success"
        }
        ```
        

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/usuarios/login**

- **Métodos suportados:** POST.
- **Parâmetros de consulta:** Nenhum.
- **Exemplos de código:**
    
    ```jsx
    async function login(email, senha){
    
    	// Objeto necessário para passar no corpo da requisição
        const usuario = {
            email: email,
            senha: senha
        }
    
        try {
    
            const requisicao = await fetch(`${url}/usuarios/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
    
            const resposta = await requisicao.json();
    
            console.log(resposta);
    
            return resposta;
            
        } catch (error) {
            console.log(error);
        }
    
    }
    ```
    
- **Resposta da API:**
    - POST - Realizar o login (É necessário passar o e-mail e a senha no corpo da requisição.)
        
        ```json
        {
        "msg": "Bem-vindo(a) Nathan",
        "status": "success",
        "dados": {
        "id": "652e5cc6bf553aded1bbef46",
        "nome": "Nathan",
        "sobrenome": "De Sousa Barros",
        "email": "nathansousa0809@gmail.com",
        "receitasFavoritas": [
        "652e5fe9bf553aded1bbef54",
        "652e602dbf553aded1bbef58"
        ]
        },
        "token": "seu token de autenticação"
        }
        ```
        

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas**

- **Métodos suportados:** GET, POST, PUT e DELETE.
- **Parâmetros de consulta:** para usar os métodos GET, PUT, e DELETE é necessário passar o id do evento para executar as respectivas operações de “Ler dados”, “Editar dados” e “Excluir dados”. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas/id**
- OBS: Para acessar essa rota é preciso estar autenticado.
- **Exemplos de código:**
    - GET: (Essa requisição também aceita um parâmetro opcional na url para receber receitas com nome específico. Caso não tenha parâmetro  ela retorna algumas receitas aleatórias.)
        
        ```jsx
        async function receitas(token) {
        
            try {
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas?nome=lasanha`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - GET: (Buscar dados de uma receita em específico)
        
        ```jsx
        async function buscarReceitas(id, token) {
        
            try {
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - POST
        
        ```jsx
        async function criarReceita(token, nome, idCriador, ingredientes, modoPreparo, tempo) {
        
            try {
        				// Objeto com os dados a serem mandados
                const receita = {nome, idCriador, ingredientes, modoPreparo, tempo}
                
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorizathion': `Bearer ${token}`
                    },
                    body: JSON.stringify(receita)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - PUT
        
        ```jsx
        async function editarReceita(id, token, nome, idCriador, ingredientes, modoPreparo, tempo) {
        
            try {
        
                const receita = {nome, idCriador, ingredientes, modoPreparo, tempo}
                
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(receita)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;;
            }
        
        }
        ```
        
    - DELETE
        
        ```jsx
        async function excluirReceita(id, token) {
            try {
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        }
        ```
        
    
    - **Respostas da API:**
- GET - Buscar algumas receitas cadastradas (Existe um parâmetro opcional para buscar o nome da receita.)
    
    ```json
    {
    "msg": "OK",
    "status": "success",
    "dados": [
    {
    "_id": "652e65f75fe4b06fce35ab6b",
    "nome": "TESTE 1",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "teste 1, teste2, teste 3",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 35,
    "data": "17-10-2023"
    },
    {
    "_id": "652e66145fe4b06fce35ab6d",
    "nome": "TESTE 2",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "teste 1, teste2, teste 3, teste 4, teste 5",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 90,
    "data": "17-10-2023"
    },
    {
    "_id": "652e600ebf553aded1bbef56",
    "nome": "RECEITA 2",
    "idCriador": "652e5cc6bf553aded1bbef46",
    "ingredientes": "teste 1, teste2",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbadjcbsdojcbnbscjsab",
    "tempo": 15,
    "data": "17-10-2023"
    },
    {
    "_id": "652e5fe9bf553aded1bbef54",
    "nome": "RECEITA 1",
    "idCriador": "652e5cc6bf553aded1bbef46",
    "ingredientes": "teste 1, teste2, teste3, teste4",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbadjcbsdojcbnbscjsab",
    "tempo": 55,
    "data": "17-10-2023"
    },
    {
    "_id": "652e602dbf553aded1bbef58",
    "nome": "RECEITA 3",
    "idCriador": "652e5cc6bf553aded1bbef46",
    "ingredientes": "teste 1, teste2, teste 3",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 25,
    "data": "17-10-2023"
    }
    ]
    }
    ```
    
- GET - Buscar uma receita específica (É necessário passar o id da receita como parâmetro)
    
    ```json
    {
        "msg": "OK",
        "status": "success",
        "dados": {
            "_id": "652e65f75fe4b06fce35ab6b",
            "nome": "TESTE 1",
            "idCriador": "652e5cefbf553aded1bbef49",
            "ingredientes": "teste 1, teste2, teste 3",
            "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
            "tempo": 35,
            "data": "17-10-2023",
            "__v": 0
        }
    }
    ```
    
- POST - Criar uma nova receita
    
    ```json
    {
        "msg": "Receita criada com sucesso.",
        "status": "success",
        "dados": {
            "nome": "Lasanha",
            "idCriador": "652e5cefbf553aded1bbef49",
            "ingredientes": "Ingerdiente 1, ingrediente 2, ...etc",
            "modoPreparo": "Modo de preparo da lasanha",
            "tempo": 90,
            "data": "20-10-2023",
            "_id": "6532b9eba49bc40d2175dc01",
        }
    }
    ```
    
- PUT - Editar receita (É necessário passar o id da receita como parâmetro)
    
    ```json
    {
        "msg": "receita editada com sucesso",
        "status": "success",
        "dados": {
            "_id": "6532b9eba49bc40d2175dc01",
            "nome": "Lasanha de berinjela",
            "idCriador": "652e5cefbf553aded1bbef49",
            "ingredientes": "Ingerdiente 1, ingrediente 2, ...etc",
            "modoPreparo": "Modo de preparo da lasanha de berinjela.",
            "tempo": 90,
            "data": "20-10-2023",
            "__v": 0
        }
    }
    ```
    
- DELETE - Deletar receita (É necessário passar o id da receita como parâmetro)
    
    

```json
{
    "msg": "Receita excluída com sucesso.",
    "status": "success"
}
```

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/receitasfavoritas/id

- **Métodos suportados:** GET, POST e PUT.
- **Parâmetros de consulta:** para usar os métodos GET, POST, e PUT é necessário passar o id do evento para executar as respectivas operações de “Ler dados”, “Editar dados” e “Excluir dados”. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas/receitasfavoritas/id**
- **Exemplos de código:**
    - GET
        
        ```jsx
        async function receitasFavoritas(id, token) {
        
            try {
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitasfavoritas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                const resposta = requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - POST
        
        ```jsx
        async function favoritarReceita(id, idReceita,token) {
        
            try {
        				// Objeto com os dados a serem mandados
                const receita = {idReceita}
                
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitasfavoritas/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorizathion': `Bearer ${token}`
                    },
                    body: JSON.stringify(receita)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - PUT
        
        ```jsx
        // Função para remover uma receita da lista de favoritos
        async function removerFavoritos(id, idReceita,token) {
        
            try {
        				// Objeto com os dados a serem mandados
                const receitaId = {idReceita}
                
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitasfavoritas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorizathion': `Bearer ${token}`
                    },
                    body: JSON.stringify(receitaId)
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
        
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
- **Respostas da API:**
    - POST
        
        ```json
        // Retorna uma lista com os ids da receita.
        {
            "msg": "OK",
            "status": "success",
            "dados": [
                "652e602dbf553aded1bbef58"
            ]
        }
        ```
        
    - GET
        
        ```json
        // Retorna todos os dados da lista de receitas
        {
        "msg": "OK",
        "status": "success",
        "receitasFavoritas": [
        {
        "_id": "652e602dbf553aded1bbef58",
        "nome": "RECEITA 3",
        "idCriador": "652e5cc6bf553aded1bbef46",
        "ingredientes": "teste 1, teste2, teste 3",
        "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
        "tempo": 25,
        "data": "17-10-2023",
        "__v": 0
        }
        ]
        }
        ```
        
    - PUT
        
        ```json
        // Retira o id da receita da lista de receitas favoritas
        {
            "msg": "OK",
            "status": "success",
            "dados": []
        }
        ```
        
    

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/apagartudo/id

- **Métodos suportados:** DELETE
- **Parâmetros de consulta:** Essa rota é apenas para deletar todas as receitas do usuário”. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas/apagartudo/id**
- **Exemplo de código:**
    
    ```jsx
    async function excluirTodasReceitas(id, token) {
        try {
    
            const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/apagartudo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            });
    
            const resposta = await requisicao.json();
    
            return resposta;
            
        } catch (error) {
            console.log(error);
            const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
            return resposta;
        }
    }
    ```
    
- **Resposta da API:**
    
    ```json
    {
        "msg": "Todas as receitas do usuário foram deletadas com sucesso.",
        "status": "success"
    }
    ```
    

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/receitas/minhasreceitas/id

- **Métodos suportados:** GET
- **Parâmetros de consulta:** Essa rota é apenas para buscar todas as receitas do usuário”. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas/minhasreceitas/id**
- **Exemplo de código:**
    
    ```jsx
    async function minhasReceitas(id, token) {
    
        try {
    
            const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/minhasreceitas/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const resposta = requisicao.json();
    
            return resposta;
            
        } catch (error) {
            console.log(error);
            const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
            return resposta;
        }
    
    }
    ```
    
- Respostas da API
    
    ```json
    {
    "msg": "Sucesso!",
    "status": "success",
    "dados": [
    {
    "_id": "652e65f75fe4b06fce35ab6b",
    "nome": "TESTE 1",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "teste 1, teste2, teste 3",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 35,
    "data": "17-10-2023",
    "__v": 0
    },
    {
    "_id": "652e66145fe4b06fce35ab6d",
    "nome": "TESTE 2",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "teste 1, teste2, teste 3, teste 4, teste 5",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 90,
    "data": "17-10-2023",
    "__v": 0
    },
    {
    "_id": "6532b9afa49bc40d2175dbff",
    "nome": "TESTE 2",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "teste 1, teste2, teste 3, teste 4, teste 5",
    "modoPreparo": "cuadbkcasblakcnbishdcbslajcbacibhaidfcviadjcbsdojcbnbscjsab",
    "tempo": 90,
    "data": "20-10-2023",
    "__v": 0
    },
    {
    "_id": "6532b9eba49bc40d2175dc01",
    "nome": "Lasanha de berinjela",
    "idCriador": "652e5cefbf553aded1bbef49",
    "ingredientes": "Os ingredientes aqui:",
    "modoPreparo": "Modo de preparo da lasanha de berinjela.",
    "tempo": 55,
    "data": "20-10-2023",
    "__v": 0
    }
    ]
    }
    ```
    

### [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/recuperarsenha

- **Métodos suportados:** POST e PATCH.
- **Parâmetros de consulta:** Essa rota serve para enviar o e-mail de recuperação de senha e também recuperar a senha. exemplo de URL: [https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)**/receitas/recuperarsenha.**
- **Exemplos de código:**
    - POST
        
        ```jsx
        async function enviarEmail(email) {
        
            try {
        
                const requisicao = await fetch(`[https://codigourmet-api.vercel.app](https://codigourmet-api.vercel.app/)/recuperarsenha`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email})
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
    - PATCH
        
        ```jsx
        async function recuperarSenha (id, senha) {
        
            try {
        
                const requisicao = await fetch(`${url}${endpointSenha}/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({senha})
                });
        
                const resposta = await requisicao.json();
        
                return resposta;
                
            } catch (error) {
                console.log(error);
                const resposta = {msg: `Algo deu errado. Tente novamente mais tarde.`, status: `error`}
                return resposta;
            }
        
        }
        ```
        
- Respostas da API
    - POST
        
        ```jsx
        {
            "msg": "E-mail enviado! confira sua caixa de emails.",
            "status": "success"
        }
        ```
        
    - PATCH
        
        ```jsx
        {
            "msg": "Senha alterada com sucesso",
            "status": "success"
        }
        ```
