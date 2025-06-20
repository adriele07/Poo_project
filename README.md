# Poo_project
-> Comandos para executar o programa:
## Como executar o script start.sh

# 1. Navegue até a pasta do projeto onde o script está localizado
cd ~/../Poo_project-main/projeto

# 2. Dê permissão de execução ao script (caso ainda não tenha e esteja no linux, se for windows não é necessário)
chmod +x start.sh

# 3. Execute o script para iniciar o back-end e o front-end
(para linux)
./start.sh 

(para windows)
.\start_project.bat


------------------------------------------------------------------------------------------------------------------
# Documentação Completa do Sistema

## Visão Geral
Composto por um front-end em React (com Vite) e um back-end em Python utilizando FastAPI. O armazenamento dos dados é feito em arquivos JSON, dispensando o uso de bancos de dados relacionais tradicionais. 
## Estrutura de Pastas
- `projeto/front-end/`: Código-fonte do front-end (React + Vite)
- `projeto/back-end/`: Código-fonte do back-end (FastAPI)
- `projeto/database/`: Arquivos JSON que armazenam os dados persistentes (`usuarios.json`, ``, ``)

## Funcionalidades Principais
- Cadastro de usuários
- Login de usuários
- Integração total entre front-end e back-end via API REST
- Persistência dos dados em arquivos JSON
- Documentação automática da API via Swagger (FastAPI)

## Detalhes do Front-end
- **Configuração:**
  - O arquivo `.env` define a URL base da API: `VITE_AXIOS_BASE_URL=http://127.0.0.1:8000`
- **Componentes principais:**
  - `Login.jsx`: Tela de login, envia POST para `/login` e exibe mensagens de erro do back-end
  - `Register.jsx`: Tela de cadastro, envia POST para `/usuarios` e trata erros/sucesso
  - `Home.jsx`, `Header.jsx`, `Item.jsx`: Exibição de produtos, navegação e layout
- **Fluxo de autenticação:**
  - O usuário faz login, recebe resposta do back-end e, se autenticado, pode acessar áreas protegidas
- **Tratamento de erros:**
  - Mensagens de erro do back-end são exibidas diretamente nas telas de login e cadastro

## Detalhes do Back-end
- **Framework:** FastAPI (Python)
- **POO:**
  - Classes para modelos de dados (`User`, `Product`, `Sale`)
  - Classe `DBManager` para manipulação dos arquivos JSON
- **Principais rotas:**
  - `POST /usuarios`: Cadastro de novo usuário
  - `POST /login`: Autenticação de usuário
  - `GET /usuarios`: Listagem de usuários
  - `GET /produtos`: Listagem de produtos
  - `GET /produtos/{id}`: Detalhes de um produto
- **Segurança:**
  - Senhas são armazenadas de forma segura usando hash (passlib/bcrypt)
  - JWT para autenticação e autorização (python-jose)
- **CORS:**
  - Middleware habilitado para permitir requisições do front-end
- **Documentação automática:**
  - Disponível em `/docs` (Swagger UI)

## Banco de Dados (JSON)
- **usuarios.json:** Armazena todos os usuários cadastrados
- **produtos.json:** Armazena os produtos disponíveis
- **vendas.json:** Armazena o histórico de vendas
- **Funcionamento:**
  - Toda operação de cadastro, login, listagem e venda lê e grava diretamente nesses arquivos
  - Não é necessário configurar ou instalar banco de dados relacional

## Fluxos do Sistema
### Cadastro de Usuário
1. Usuário preenche nome, email e senha no front-end
2. Front-end envia POST para `/usuarios`
3. Back-end valida dados, verifica duplicidade e salva no `usuarios.json`
4. Resposta de sucesso ou erro é exibida no front-end

### Login
1. Usuário preenche email e senha
2. Front-end envia POST para `/login`
3. Back-end valida credenciais em `usuarios.json` e retorna token JWT se válido
4. Front-end armazena token e permite acesso a áreas protegidas


## Instalação e Execução
### Dependências do Back-end
- Instale com:
  ```sh
  pip install -r requirements.txt
  ```
- Principais pacotes: `fastapi`, `uvicorn`, `passlib[bcrypt]`, `python-jose`


## Observações Técnicas
- O sistema é multiplataforma (Windows e Linux)
- Não depende de banco de dados relacional
- O código do back-end é modularizado, facilitando manutenção e expansão
- A documentação da API pode ser acessada em `/docs` após iniciar o back-end


## Exemplos de Uso
- **Cadastro:**
  - Envie um POST para `/usuarios` com `{ "nome": "João", "email": "joao@email.com", "senha": "123456" }`
- **Login:**
  - Envie um POST para `/login` com `{ "email": "joao@email.com", "senha": "123456" }`

## Programação Orientada a Objetos (POO) no Sistema

- **Modelos de Dados como Classes:**
  - Usuários, produtos e vendas são representados por classes Python (por exemplo, `User`, `Product`, `Sale`). Cada instância dessas classes representa um registro do sistema, encapsulando atributos (como nome, email, preço, etc.) e métodos relacionados.

- **Gerenciamento do Banco JSON:**
  - Existe uma classe específica, geralmente chamada `DBManager` (ou similar), responsável por toda a lógica de leitura, escrita e atualização dos arquivos JSON. Essa classe centraliza as operações de persistência, tornando o código mais limpo e seguro.

- **Encapsulamento e Modularização:**
  - As regras de negócio, como validação de dados, autenticação, hash de senhas e manipulação de vendas, são implementadas como métodos das classes. Isso evita código duplicado e facilita alterações futuras.

- **Exemplo Prático:**
  - Ao cadastrar um usuário, o sistema cria uma instância da classe `User`, valida os dados e utiliza métodos do `DBManager` para salvar no arquivo JSON.
  - Para autenticação, métodos da classe de usuário podem ser usados para verificar senha e gerar tokens.



## Comunicação entre Back-end, Front-end e Banco de Dados JSON

### 1. Comunicação Back-end ↔ Front-end
- O front-end (React) faz requisições HTTP (usando Axios) para a API do back-end (FastAPI).
- Essas requisições seguem o padrão REST, utilizando métodos como POST (para cadastro e login) e GET (para listagem de dados).
- O endereço base da API é configurado no front-end via arquivo `.env` (exemplo: `VITE_AXIOS_BASE_URL=http://127.0.0.1:8000`).
- Exemplos de requisições:
  - Cadastro: `POST /usuarios` com os dados do usuário no corpo da requisição.
  - Login: `POST /login` com email e senha.
  - Listagem: `GET /usuarios` ou `GET /produtos`.
- O back-end responde com dados em formato JSON, mensagens de erro ou tokens de autenticação (JWT).
- O front-end interpreta essas respostas e atualiza a interface do usuário conforme o resultado (exibindo mensagens, redirecionando, etc.).

### 2. Comunicação Back-end ↔ Banco de Dados JSON
- O back-end não utiliza um banco de dados tradicional, mas sim arquivos JSON para persistir os dados.
- Quando uma requisição chega ao back-end:
  - Para cadastro, o FastAPI recebe os dados, instancia um objeto (ex: `User`), valida e chama métodos do `DBManager` para gravar no arquivo `usuarios.json`.
  - Para login, o back-end lê o arquivo `usuarios.json`, busca o usuário pelo email e valida a senha.
  - Para listagem, o back-end lê o arquivo correspondente (`usuarios.json`, `produtos.json`, etc.) e retorna os dados em formato JSON para o front-end.
  - Para vendas, o back-end grava as informações no arquivo `vendas.json`.
- Toda leitura e escrita nos arquivos JSON é feita de forma controlada, geralmente usando métodos de uma classe gerenciadora (ex: `DBManager`), garantindo integridade e evitando corrupção dos dados.

### 3. Fluxo Resumido de uma Operação (Exemplo: Cadastro de Usuário)
1. O usuário preenche o formulário no front-end e clica em cadastrar.
2. O front-end envia uma requisição `POST /usuarios` para o back-end, com os dados do usuário.
3. O back-end recebe a requisição, valida os dados, verifica se o email já existe lendo o `usuarios.json`.
4. Se estiver tudo certo, o back-end adiciona o novo usuário ao arquivo `usuarios.json`.
5. O back-end responde ao front-end com uma mensagem de sucesso ou erro.
6. O front-end exibe a resposta ao usuário.

### 4. Segurança e Consistência
- O back-end utiliza hash de senha e validação de dados antes de gravar no JSON.
- O acesso aos arquivos JSON é sempre feito por métodos controlados, evitando manipulação direta e garantindo a integridade dos dados.

Essa arquitetura permite que o sistema funcione de forma simples, didática e sem dependências externas de banco de dados, facilitando testes, manutenção e aprendizado.

### Justificativa das Escolhas Tecnológicas

- **FastAPI:** Framework moderno, rápido e com tipagem forte para Python, facilita a criação de APIs RESTful e gera documentação automática.
- **JSON como banco:** Simplicidade, portabilidade e fácil visualização dos dados, ideal para projetos didáticos e MVPs.

### Segurança e Tratamento de Erros
- **Senhas:** São armazenadas com hash seguro (bcrypt), nunca em texto puro.
- **JWT:** Utilizado para autenticação, garantindo que apenas usuários autenticados acessem rotas protegidas.
- **CORS:** Configurado para evitar problemas de requisições entre domínios.
- **Validação:** Todos os dados recebidos são validados antes de serem processados ou salvos.
- **Tratamento de erros:** Mensagens claras são retornadas ao front-end, e erros críticos são tratados para evitar vazamento de informações sensíveis.


### Limitações
- **Concorrência:** O uso de arquivos JSON não é ideal para múltiplos acessos simultâneos; bancos relacionais resolvem isso.
- **Escalabilidade:** Para muitos registros, o desempenho pode cair. Bancos como PostgreSQL ou MongoDB são recomendados para produção.



### Estrutura dos Arquivos JSON (Exemplo)
- `usuarios.json`:
  ```json
  [
    {"id": 1, "nome": "João", "email": "joao@email.com", "senha": "$2b$12$..."
  ]
  ```
- `produtos.json`:
  ```json
  [
    {"id": 1, "nome": "Produto A", "preco": 100.0, "descricao": "..."
  ]
  ```



### Referências e Créditos
- Documentação oficial do [FastAPI](https://fastapi.tiangolo.com/)
- Documentação do [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Passlib](https://passlib.readthedocs.io/en/stable/)
- [Python-Jose](https://python-jose.readthedocs.io/en/latest/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/)
- Documentação automática da API disponível em `/docs` (Swagger UI) ao rodar o back-end




