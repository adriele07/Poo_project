# Master — Sistema de Reservas com POO

## Visão Geral
Este projeto é um sistema completo de reservas de acomodações, desenvolvido para demonstrar domínio  de Programação Orientada a Objetos (POO) em Python, aliado a um front-end moderno em React. O armazenamento é feito em arquivos JSON, dispensando bancos relacionais, e toda a lógica de negócio é fortemente baseada em conceitos de POO, boas práticas de arquitetura e segurança.

---

## Estrutura do Projeto
- **Master/back-end/**: Código do back-end (FastAPI + Python + POO)
- **Master/front-end/**: Código do front-end (React + Vite)
- **Master/database/**: Arquivos JSON que simulam o banco de dados
- **Master/uploads/**: Imagens das acomodações

### Organização dos diretórios principais
- `back-end/models/`: Classes de domínio (User, Place, Booking)
- `back-end/routers/`: Rotas organizadas por recurso (user, place, booking)
- `back-end/schemas.py`: Schemas Pydantic para validação e documentação
- `back-end/db_manager.py`: Classe central de persistência e manipulação dos dados
- `database/usuarios.json`, `produtos.json`, `vendas.json`: "Banco de dados" do sistema
- `uploads/`: Armazenamento de imagens das acomodações

---

## Como Executar
1. Dê permissão de execução ao script (Linux):
   ```sh
   chmod +x start.sh
   ```
2. Execute o script para iniciar back-end e front-end:
   ```sh
   ./start.sh
   ```
   (No Windows, use `start_project.bat`)
3. Acesse o front-end em [http://localhost:5173](http://localhost:5173) e a documentação da API em [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Destaques de Programação Orientada a Objetos (POO)

### 1. Modelos de Dados como Classes
- **User, Place, Booking**: Cada entidade do sistema é representada por uma classe Python, encapsulando atributos e métodos.
- **Exemplo:**
  - `models/user.py`: Classe `User` com métodos para validação, autenticação e hash de senha.
  - `models/place.py`: Classe `Place` para imóveis, com métodos de serialização.
  - `models/booking.py`: Classe `Booking` para reservas, com métodos de validação de datas.

### 2. Encapsulamento e Modularização
- **DBManager**: Classe centralizadora para manipulação dos arquivos JSON, garantindo acesso controlado e seguro aos dados.
- **Exemplo:**
  - `db_manager.py`: Classe `DBManager` com métodos como `add_user`, `get_users`, `add_place`, `add_booking`, `save_json`, `load_json`, etc.
- **Vantagem:**
  - Todas as operações de leitura/escrita são feitas via métodos, evitando acesso direto aos arquivos e facilitando manutenção, testes e refatoração.

### 3. Regras de Negócio como Métodos
- Métodos das classes implementam validação, autenticação, hash de senha, geração de tokens JWT, verificação de disponibilidade, etc.
- **Exemplo:**
  - `User.check_password()`, `User.generate_token()`, `DBManager.validate_user()`, `Booking.is_available()`

### 4. Herança e Reuso
- As classes de modelos herdam de `BaseModel` do Pydantic, aproveitando validação automática, tipagem forte e serialização/deserialização fácil.

### 5. Separação de Responsabilidades
- **Routers**: Cada recurso tem seu próprio arquivo de rotas (ex: `routers/user.py`, `routers/place.py`), seguindo o princípio de responsabilidade única.
- **Schemas**: Definição clara dos dados esperados/retornados em cada endpoint, usando Pydantic.
- **Utils**: Funções auxiliares para tarefas como hashing, manipulação de datas, etc.

### 6. Padrões de Projeto
- Uso de Singleton para o gerenciador de banco (`DBManager`), evitando múltiplas instâncias e garantindo integridade dos dados.
- Padrão Service para separar lógica de negócio das rotas.

---

## Justificativa das Escolhas Técnicas
- **FastAPI**: Framework moderno, rápido, com tipagem forte, documentação automática e suporte nativo a Pydantic e JWT.
- **POO**: Facilita manutenção, reuso, testes, expansão e clareza do sistema.
- **JSON**: Simples, didático e suficiente para MVPs e projetos acadêmicos.
- **React + Vite**: Front-end moderno, rápido e com ótima integração via API REST.
- **Passlib**: Segurança no armazenamento de senhas.
- **python-jose**: Geração e validação de tokens JWT.

---

## Fluxos Técnicos e Arquitetura

### Cadastro de Usuário (com POO)
1. Front-end envia POST para `/users/register`.
2. Back-end recebe, instancia `User`, valida e chama `DBManager.add_user()`.
3. Usuário é salvo em `usuarios.json`.

### Login Seguro (com POO)
1. Front-end envia POST para `/users/login`.
2. Back-end busca usuário via `DBManager`, valida senha com método da classe `User`.
3. Se válido, gera JWT usando método da classe.

### Cadastro de Imóvel (Place)
1. Usuário autenticado envia dados e imagem.
2. Back-end instancia `Place`, salva imagem, registra no JSON via `DBManager`.

### Reserva (Booking)
1. Front-end envia POST para `/bookings`.
2. Back-end instancia `Booking`, valida IDs, salva via `DBManager`.

### Upload de Imagens
- O back-end recebe arquivos via multipart/form-data, salva na pasta `uploads/` e registra o caminho no JSON.

---

## Segurança e Validação
- **Senhas**: Hash seguro com bcrypt (passlib), nunca armazenadas em texto puro.
- **JWT**: Autenticação e autorização via tokens (python-jose), protegendo rotas sensíveis.
- **CORS**: Middleware habilitado para integração front-end/back-end.
- **Validação**: Pydantic + métodos das classes garantem dados corretos e seguros.
- **Tratamento de erros**: Mensagens claras e seguras, sem vazar informações sensíveis.

---

## Exemplos de Uso de POO no Código
- Cadastro de usuário:
  ```python
  novo_usuario = User(name, email, senha)
  db.add_user(novo_usuario)
  ```
- Autenticação:
  ```python
  user = db.get_user_by_email(email)
  if user and user.check_password(senha):
      token = user.generate_token()
  ```
- Cadastro de imóvel:
  ```python
  novo_place = Place(user_id, title, ...)
  db.add_place(novo_place)
  ```
- Criação de reserva:
  ```python
  nova_reserva = Booking(user_id, place_id, ...)
  db.add_booking(nova_reserva)
  ```

---

## Rotas REST e Modelos de Dados
- **Usuários:**
  - `POST /users/register` — Cadastro seguro (POO + hash)
  - `POST /users/login` — Login seguro (POO + JWT)
  - `GET /users` — Listagem
- **Imóveis (Places):**
  - `POST /places` — Cadastro de imóvel (POO)
  - `GET /places` — Listagem
  - `POST /places/upload` — Upload de imagens
- **Reservas (Bookings):**
  - `POST /bookings` — Nova reserva (POO)
  - `GET /bookings` — Listagem

### Exemplos de Requisições
- Cadastro de usuário:
  ```http
  POST /users/register
  {
    "name": "João",
    "email": "joao@email.com",
    "password": "123456"
  }
  ```
- Login seguro:
  ```http
  POST /users/login
  {
    "email": "joao@email.com",
    "password": "123456"
  }
  // Resposta: { "access_token": "...", "token_type": "bearer" }
  ```
- Cadastro de imóvel:
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
- Criar reserva:
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

---

## Estrutura dos Arquivos JSON
- `usuarios.json`: Lista de usuários (cada um é uma instância de `User`)
- `produtos.json`: Lista de imóveis (`Place`)
- `vendas.json`: Lista de reservas (`Booking`)
- Cada registro é um dicionário serializado, validado por Pydantic e métodos das classes.

---

## Documentação Automática da API
- Assim que o back-end é iniciado, a documentação interativa da API é gerada automaticamente pelo FastAPI.
- Acesse em: [http://localhost:8000/docs](http://localhost:8000/docs)
- Permite testar todos os endpoints, visualizar modelos de dados, parâmetros e respostas, facilitando o uso, a validação e a apresentação do sistema.
- A documentação é atualizada automaticamente conforme o código evolui.

---

## Comunicação entre Back-end, Front-end e Banco de Dados JSON

### 1. Comunicação Back-end ↔ Front-end
- O front-end (React) faz requisições HTTP (usando Axios) para a API do back-end (FastAPI).
- Essas requisições seguem o padrão REST, utilizando métodos como POST (para cadastro e login), GET (para listagem de dados), etc.
- O endereço base da API é configurado no front-end via arquivo `.env` (exemplo: `VITE_AXIOS_BASE_URL=http://127.0.0.1:8000`).
- Exemplos de requisições:
  - Cadastro: `POST /users/register` com os dados do usuário no corpo da requisição.
  - Login: `POST /users/login` com email e senha.
  - Listagem: `GET /users`, `GET /places`, etc.
- O back-end responde com dados em formato JSON, mensagens de erro ou tokens de autenticação (JWT).
- O front-end interpreta essas respostas e atualiza a interface do usuário conforme o resultado (exibindo mensagens, redirecionando, etc.).

### 2. Comunicação Back-end ↔ Banco de Dados JSON
- O back-end não utiliza um banco de dados tradicional, mas sim arquivos JSON para persistir os dados.
- Quando uma requisição chega ao back-end:
  - Para cadastro, o FastAPI recebe os dados, instancia um objeto (ex: `User`), valida e chama métodos do `DBManager` para gravar no arquivo `usuarios.json`.
  - Para login, o back-end lê o arquivo `usuarios.json`, busca o usuário pelo email e valida a senha.
  - Para listagem, o back-end lê o arquivo correspondente (`usuarios.json`, `produtos.json`, etc.) e retorna os dados em formato JSON para o front-end.
  - Para vendas/reservas, o back-end grava as informações no arquivo `vendas.json`.
- Toda leitura e escrita nos arquivos JSON é feita de forma controlada, usando métodos da classe `DBManager`, garantindo integridade e evitando corrupção dos dados.

### 3. Fluxo Resumido de uma Operação (Exemplo: Cadastro de Usuário)
1. O usuário preenche o formulário no front-end e clica em cadastrar.
2. O front-end envia uma requisição `POST /users/register` para o back-end, com os dados do usuário.
3. O back-end recebe a requisição, valida os dados, verifica se o email já existe lendo o `usuarios.json`.
4. Se estiver tudo certo, o back-end adiciona o novo usuário ao arquivo `usuarios.json`.
5. O back-end responde ao front-end com uma mensagem de sucesso ou erro.
6. O front-end exibe a resposta ao usuário.

---

## Explicações Avançadas e Dicas de Uso

### Ciclo de Vida de uma Requisição
1. O usuário interage com o front-end (React), por exemplo, clicando em "Cadastrar" ou "Reservar".
2. O front-end envia uma requisição HTTP para o back-end (FastAPI), contendo os dados necessários.
3. O back-end valida os dados recebidos usando schemas Pydantic e métodos das classes.
4. Se for uma operação de escrita (cadastro, reserva), o back-end atualiza o arquivo JSON correspondente usando métodos do `DBManager`.
5. O back-end retorna uma resposta JSON ao front-end, indicando sucesso ou erro.
6. O front-end interpreta a resposta e atualiza a interface do usuário.

### Upload e Acesso a Imagens
- O front-end permite que o usuário selecione imagens ao cadastrar um imóvel.
- As imagens são enviadas via `multipart/form-data` para o endpoint `/places/upload`.
- O back-end salva o arquivo na pasta `uploads/` e registra o caminho no JSON do imóvel.
- O front-end exibe as imagens requisitando-as diretamente do back-end, que serve os arquivos estáticos.

### Autenticação JWT e Rotas Protegidas
- Após login bem-sucedido, o back-end gera um token JWT e envia ao front-end.
- O front-end armazena o token (ex: em localStorage) e o inclui no cabeçalho das próximas requisições.
- Rotas protegidas no back-end exigem o token para liberar acesso.
- Se o token for inválido ou ausente, o back-end retorna erro 401 e o front-end redireciona o usuário para login.

### Tratamento de Erros e Integridade dos Dados
- Toda entrada do usuário é validada antes de ser processada.
- Erros de validação, autenticação ou integridade são tratados e retornados com mensagens claras.
- O sistema evita duplicidade de emails, ids e reservas sobrepostas.
- Operações críticas são protegidas por métodos e validações nas classes.

### Modularização e Facilidade de Manutenção
- Cada recurso (usuário, imóvel, reserva) tem seu próprio módulo de rotas, modelos e validações.
- Novos recursos podem ser adicionados criando novas classes e rotas, sem impactar o restante do sistema.
- O uso de POO permite reuso de métodos e facilita testes unitários.


### Exemplos de Código por Camada
- **Front-end (React):**
  ```javascript
  // Exemplo de requisição de login
  axios.post('/users/login', { email, password })
    .then(res => localStorage.setItem('token', res.data.access_token));
  ```
- **Back-end (FastAPI):**
  ```python
  @router.post('/users/login')
  def login(user: UserLogin, db: DBManager = Depends(get_db)):
      ... # validação e geração de JWT
  ```
- **Banco de Dados (JSON):**
  ```json
  [
    {"id": 1, "name": "João", "email": "joao@email.com", "senha": "$2b$12$..."}
  ]
  ```

### Versionamento e Deploy Local
- O projeto pode ser versionado com Git para controle de alterações.
- Para rodar localmente, basta seguir as instruções de execução e garantir que as dependências estejam instaladas.



## Créditos e Referências
- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Passlib](https://passlib.readthedocs.io/en/stable/)
- [Python-Jose](https://python-jose.readthedocs.io/en/latest/)
- [Vite](https://vitejs.dev/)
- [Pydantic](https://docs.pydantic.dev/)






