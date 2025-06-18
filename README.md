# Poo_project

Cayo, tive que mudar umas coisas no front-end e Vitório, adicionei umas coisas no banco de dados. A minha parte do back-end ficou assim:

O que eu mudei pra tudo funcionar direitinho:
1. Login
Arrumei o Login.jsx pra:

Enviar o login pra rota certa (/login).

Usar o campo certo de senha (senha ao invés de password).

Mostrar os erros que vêm do back-end direto na tela, logo abaixo do form.

2. Cadastro
No Register.jsx:

Corrigi pra mandar o POST pra /usuarios.

Usei os campos que o back-end espera: nome, email e senha.

Mostro os erros certinhos do back-end na tela.

E redireciona pra home quando o cadastro dá certo.

3. Configuração da API
Criei um .env no front-end com:

env
VITE_AXIOS_BASE_URL=http://127.0.0.1:8000
Assim todas as requisições já vão pro back certinho.

Back-end
1. Integração com JSON
Agora o back lê e grava direto em arquivos .json (usuarios, produtos, vendas). Não depende mais de banco relacional.

2. Rotas
Implementei/ajustei:

POST /usuarios → cadastro

POST /login → login

GET /usuarios → listar usuários

GET /produtos e GET /produtos/{id} → listar produtos

3. CORS
Ativei o middleware de CORS pra integrar direitinho com o front.

Banco (JSON)
usuarios.json
Os usuários são cadastrados e validados aqui.

Testei e tá salvando certinho.



1. O que instalar
Back-end (Python)
No diretório back-end, instale as dependências:

pip install -r requirements.txt

Pacotes necessários:

fastapi
uvicorn
passlib[bcrypt]
python-jose

Front-end (React + Vite)
No diretório front-end, instale as dependências:
npm install


Principais pacotes:

react
react-dom
react-router-dom
axios
tailwindcss
@tailwindcss/vite
vite

2. Como rodar o sistema

Rodar o Front-end
Em outro terminal, execute:

cd projeto-final/front-end
npm run dev -- --port 5175

O front-end ficará disponível em:
http://localhost:5175

Rodar o Back-end
No terminal, execute:

cd projeto-final/back-end
uvicorn main:app --reload
ou tente
cd back-end && uvicorn main:app --reload --host 0.0.0.0 --port 8000

O back-end ficará disponível em:
http://127.0.0.1:8000



3. Como ver o banco JSON funcionando
Os dados dos usuários, produtos e vendas ficam nos arquivos:
usuarios.json
produtos.json
vendas.json
Sempre que cadastrar, logar ou listar usuários/produtos pelo sistema, esses arquivos são lidos e atualizados automaticamente.


O back-end aplica POO ao definir classes para os modelos de dados (usuário, produto, etc.) e para o gerenciamento do banco JSON (classe DBManager). Toda a lógica de manipulação dos dados é feita através de métodos dessas classes, usando instâncias (objetos) para representar e tratar as informações do sistema.

