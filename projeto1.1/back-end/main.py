from fastapi import FastAPI, HTTPException, Body  # Importa FastAPI e utilitários
from fastapi.middleware.cors import CORSMiddleware  # Middleware para permitir requisições de outros domínios
from pydantic import BaseModel  # Base para validação de dados
from fastapi.staticfiles import StaticFiles  # Para servir arquivos estáticos (imagens)
import os
from db_manager import DBManager  # Gerenciador de dados (JSON)
from typing import List
from routers.place import router as place_router  # Rotas de acomodações
from routers.booking import router as booking_router  # Rotas de reservas
from routers.user import router as user_router  # Rotas de usuários

app = FastAPI()  # Inicializa a aplicação FastAPI

# Instancia o gerenciador de banco de dados (JSON)
db = DBManager()

# Define o caminho absoluto para a pasta de uploads (imagens)
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
# Monta a pasta /uploads para servir arquivos estáticos
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Configura o CORS para permitir que o front-end acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (pode restringir para produção)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de dados para validação e documentação automática
class Produto(BaseModel):
    id: int
    nome: str
    descricao: str
    preco: float
    quantidade: int

class UsuarioCreate(BaseModel):
    nome: str
    email: str
    senha: str

class UsuarioLogin(BaseModel):
    email: str
    senha: str

# Rotas de exemplo para produtos
@app.get("/")
def read_root():
    """Rota raiz, retorna mensagem de boas-vindas."""
    return {"message": "API da Loja Online"}

@app.get("/produtos", response_model=List[Produto])
def get_produtos():
    """Retorna todos os produtos cadastrados."""
    return db.get_all_produtos()

@app.get("/produtos/{produto_id}", response_model=Produto)
def get_produto(produto_id: int):
    """Retorna um produto específico pelo ID."""
    produto = db.get_produto_by_id(produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

@app.post("/usuarios")
def create_usuario(usuario: UsuarioCreate):
    """
    Cria um novo usuário.
    - Recebe os dados do usuário (nome, email, senha).
    - Verifica se o email já está cadastrado.
    - Se não, cria o usuário e retorna seus dados (id, nome, email).
    """
    if db.get_usuario_by_email(usuario.email):
        raise HTTPException(status_code=400, detail="Email já registrado")
    novo_usuario = db.create_usuario(usuario)
    return {"id": novo_usuario["id"], "nome": novo_usuario["nome"], "email": novo_usuario["email"]}

@app.get("/usuarios")
def list_usuarios():
    """
    Lista todos os usuários cadastrados.
    - Retorna todos os usuários presentes no banco de dados (JSON).
    """
    return db._ler_dados(db.usuarios_path)

@app.post("/login")
def login(usuario: UsuarioLogin = Body(...)):
    """
    Realiza o login de um usuário.
    - Recebe email e senha.
    - Busca o usuário pelo email e compara a senha.
    - Se válido, retorna os dados do usuário.
    - Se inválido, retorna erro 400.
    """
    user = db.get_usuario_by_email(usuario.email)
    if not user or user._password != usuario.senha:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    return {"id": user.id, "nome": user.name, "email": user.email}

# Inclui os routers das demais funcionalidades
# - place_router: rotas de acomodações (places)
# - booking_router: rotas de reservas (bookings)
# - user_router: rotas de usuários (users)
app.include_router(place_router)
app.include_router(booking_router)
app.include_router(user_router)
