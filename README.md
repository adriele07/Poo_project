# Poo_project

# Como executar o script start.sh
-> Comandos para executar o programa:

## 1. Navegue até a pasta do projeto onde o script está localizado
```sh
cd ~/../Poo_project-main/projeto
```
## 2. Dê permissão de execução ao script (caso ainda não tenha e esteja no linux, se for windows não é necessário)
```sh
chmod +x start.sh
```
## 3. Execute o script para iniciar o back-end e o front-end
- **(para linux)**
```sh
./start.sh
```

- **(para windows)**
```sh
.\start_project.bat
```


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

## Rotas REST Disponíveis

### Usuários
- `POST /usuarios` — Cadastro de novo usuário (simples, sem hash de senha)
- `GET /usuarios` — Lista todos os usuários
- `POST /login` — Login simples (sem JWT, senha em texto puro)

- `POST /users/register` — Cadastro de usuário com hash de senha (seguro)
- `POST /users/login` — Login seguro, retorna JWT
- `GET /users` — Lista todos os usuários (versão segura)

### Produtos/Imóveis (Places)
- `GET /produtos` — Lista todos os produtos
- `GET /produtos/{id}` — Detalhes de um produto
- `POST /places` — Cadastro de novo imóvel (place)
- `GET /places` — Lista todos os imóveis
- `POST /places/upload` — Upload de imagens (envio de arquivos)

### Reservas (Bookings)
- `POST /bookings` — Cria uma nova reserva
- `GET /bookings` — Lista todas as reservas


## Modelos de Dados (Schemas)
- **UserCreate**: `{ name, email, password }`
- **UserOut**: `{ id, name, email }`
- **PlaceCreate**: `{ user_id, title, address, photos, description, perks, extras, price, checkin, checkout, person }`
- **PlaceOut**: `{ id, title, address }`
- **BookingCreate**: `{ user_id, place_id, check_in, check_out, price, guests }`
- **BookingOut**: `{ id, user_id, place_id }`


## Exemplos de Requisições

### Cadastro de Usuário Seguro
```http
POST /users/register
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Login Seguro
```http
POST /users/login
{
  "email": "joao@email.com",
  "password": "123456"
}
// Resposta: { "access_token": "...", "token_type": "bearer" }
```

### Cadastro de Imóvel
```http
POST /places
{
  "user_id": "1",
  "title": "Apartamento Central",
  "address": "Rua X, 123",
  "photos": ["uploads/foto1.png"],
  "description": "Ótimo local!",
  "perks": ["Wi-Fi", "Ar-condicionado"],
  "extras": "Café da manhã",
  "price": 200.0,
  "checkin": "14:00",
  "checkout": "12:00",
  "person": 2
}
```

### Upload de Imagens
- Envie arquivos via multipart/form-data para `/places/upload`.

### Criar Reserva
```http
POST /bookings
{
  "user_id": 1,
  "place_id": 2,
  "check_in": "2025-07-01",
  "check_out": "2025-07-05",
  "price": 800.0,
  "guests": 2
}
```


## Observações Importantes
- O sistema possui duas formas de autenticação: uma simples (sem hash/JWT) e outra segura (com hash de senha e JWT).
- Prefira sempre as rotas `/users/register` e `/users/login` para produção.
- O upload de imagens salva os arquivos na pasta `uploads/` do back-end.
- As reservas são persistidas em `vendas.json`.
- Os modelos Pydantic garantem validação dos dados recebidos.
- O campo `user_id` do cadastro de acomodações (places) serve apenas para identificar qual usuário criou a acomodação, mas o id da acomodação é independente do id do usuário.

## Fluxos Adicionais
- **Cadastro de imóvel:** O usuário deve estar cadastrado. O ID do usuário é enviado no campo `user_id`.
- **Reserva:** O usuário e o imóvel devem existir. O sistema valida IDs antes de criar a reserva.


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




