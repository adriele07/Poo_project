from fastapi import APIRouter, HTTPException, status
from utils import get_password_hash, verify_password, create_access_token
from typing import List
from db_manager import DBManager
from schemas import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])
db_manager = DBManager()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate):
    hashed_password = get_password_hash(user.password)
    class Usuario:
        def __init__(self, nome, email, senha):
            self.nome = nome
            self.email = email
            self.senha = senha
    usuario = Usuario(user.name, user.email, hashed_password)
    novo_usuario = db_manager.create_usuario(usuario)
    if not novo_usuario:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    return {"id": novo_usuario["id"], "name": novo_usuario["nome"], "email": novo_usuario["email"]}

@router.post("/login")
def login(user: UserCreate):
    usuario = db_manager.get_usuario_by_email(user.email)
    if not usuario or not verify_password(user.password, usuario["senha"]):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    access_token = create_access_token({"sub": usuario["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/", response_model=List[UserOut])
def get_users():
    usuarios = db_manager._ler_dados(db_manager.usuarios_path)
    return [{"id": u["id"], "name": u["nome"], "email": u["email"]} for u in usuarios]
