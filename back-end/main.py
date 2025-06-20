from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db_manager import DBManager
from typing import List

app = FastAPI()
db = DBManager()  # Instancia nosso gerenciador

# Permite que o Front-end (rodando em outra porta) acesse o Back-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de dados para validação
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

# Rotas da API
@app.get("/")
def read_root():
    return {"message": "API da Loja Online"}

@app.get("/produtos", response_model=List[Produto])
def get_produtos():
    return db.get_all_produtos()

@app.get("/produtos/{produto_id}", response_model=Produto)
def get_produto(produto_id: int):
    produto = db.get_produto_by_id(produto_id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

@app.post("/usuarios")
def create_usuario(usuario: UsuarioCreate):
    if db.get_usuario_by_email(usuario.email):
        raise HTTPException(status_code=400, detail="Email já registrado")
    novo_usuario = db.create_usuario(usuario)
    return {"id": novo_usuario["id"], "nome": novo_usuario["nome"], "email": novo_usuario["email"]}

@app.get("/usuarios")
def list_usuarios():
    return db._ler_dados(db.usuarios_path)

@app.post("/login")
def login(usuario: UsuarioLogin = Body(...)):
    user = db.get_usuario_by_email(usuario.email)
    if not user or user["senha"] != usuario.senha:
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    return {"id": user["id"], "nome": user["nome"], "email": user["email"]}
