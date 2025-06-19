# Poo_project
-> Comandos para executar o programa:
## Como executar o script start.sh

# 1. Navegue até a pasta do projeto onde o script está localizado
cd ~/../Poo_project-main/projeto

# 2. Dê permissão de execução ao script (caso ainda não tenha)
chmod +x start.sh

# 3. Execute o script para iniciar o back-end e o front-end
./start.sh

------------------------------------------------------------------------------------------------------------------
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

2. Como rodar o sistema (Linux)

Rodar o Front-end
Em outro terminal, execute:
exemplo:
cd C:\Users\informatica\Documents\GitHub\Poo_project\projeto\front-end
npm install
npm run dev

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

lembrando que meu notebook é sistema linux 

3.Como rodar o sistema (Windows)
De inicio tente execultarno terminal do visual code:

Front-end:
cd projeto\front-end
npm install
npm run dev

Back-end:
cd projeto\back-end
pip install -r requirements.txt
python main.py


ou Abra o PowerShell.
Navegue até a pasta do front-end do projeto:
exemplo:
cd c:\Users\informatica\Documents\GitHub\Poo_project\projeto\front-end
Instale as dependências (apenas na primeira vez ou se houver mudanças no package.json):
npm install
Inicie o servidor de desenvolvimento:
npm run dev
Isso irá rodar o front-end e mostrar no terminal o endereço (geralmente http://localhost:5173) para acessar no navegador.

se aparecer algo como apareceu para mim:
npm : O termo 'npm' não é reconhecido como nome de cmdlet, função, arquivo de script ou programa operável. Verifique a......

Baixe e instale o Node.js:
Acesse: https://nodejs.org/
Baixe a versão LTS (recomendada).
Instale normalmente (o instalador já adiciona o npm ao PATH).

Feche e reabra o PowerShell após a instalação.
Verifique se o npm está instalado rodando:
npm -v

Agora rode novamente:
exemplo:cd C:\Users\informatica\Documents\GitHub\Poo_project\projeto\front-end
npm install
npm run dev

mAS SE AGORA APARECER ALGO COMO:
npm : O arquivo C:\Program Files\nodejs\npm.ps1 não pode ser carregado porque a execução de scripts foi desabilitada
neste sistema. Para obter mais informações, consulte about_Execution_Policies em
https://go.microsoft.com/fwlink/?LinkID=135170.
No linha:1 caractere:1

Abra o PowerShell como Administrador:
Clique com o botão direito no ícone do PowerShell e escolha "Executar como administrador".
Rode este comando para permitir scripts do Node.js:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Quando perguntar, digite S (Sim) e pressione Enter.
Feche o PowerShell e abra novamente (pode ser como usuário normal).

Teste novamente:
npm -v
E TENTE RODAR NOVAMENTE

Para o back-end:
cd C:\Users\informatica\Documents\GitHub\Poo_project\projeto\back-end
pip install -r requirements.txt
python main.py

caso isso apareça:![image](https://github.com/user-attachments/assets/114fbb50-a369-4b5c-b397-d8fa9f7a1032)
O que fazer:

Abra o PowerShell.
Execute os comandos abaixo para rodar o back-end:
cd C:\Users\informatica\Documents\GitHub\Poo_project\projeto\back-end
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

se o  endereço http://0.0.0.0:8000 não funcionar tente http://127.0.0.1:8000  ou http://localhost:8000

Acessando o Sistema
Front-end:
Você acessa pelo navegador em http://localhost:5173 (ou a porta mostrada no terminal).
Back-end:
O back-end fica disponível em http://127.0.0.1:8000 (e a documentação automática em http://127.0.0.1:8000/docs).

4. Como ver o banco JSON funcionando
Os dados dos usuários, produtos e vendas ficam nos arquivos:
usuarios.json
produtos.json
vendas.json
Sempre que cadastrar, logar ou listar usuários/produtos pelo sistema, esses arquivos são lidos e atualizados automaticamente.


O back-end aplica POO ao definir classes para os modelos de dados (usuário, produto, etc.) e para o gerenciamento do banco JSON (classe DBManager). Toda a lógica de manipulação dos dados é feita através de métodos dessas classes, usando instâncias (objetos) para representar e tratar as informações do sistema.

