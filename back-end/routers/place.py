from fastapi import APIRouter, HTTPException, UploadFile, File
import os
from schemas import PlaceCreate, PlaceOut
from typing import List
from db_manager import DBManager
from pathlib import Path

router = APIRouter(prefix="/places", tags=["places"])
db_manager = DBManager()

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), '..', 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=List[str])
def upload_images(files: List[UploadFile] = File(...)):
    saved_files = []
    for file in files:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as f:
            f.write(file.file.read())
        saved_files.append(f"uploads/{file.filename}")
    return saved_files

@router.post("/", response_model=PlaceOut)
def create_place(place: PlaceCreate):
    usuarios = db_manager._ler_dados(db_manager.usuarios_path)
    if not any(str(u.get('id')) == str(place.user_id) for u in usuarios):
        raise HTTPException(status_code=400, detail="Usuário não encontrado")
    produtos = db_manager.get_all_produtos()
    novo_id = max([p.get('id', 0) for p in produtos] + [0]) + 1
    novo_produto = {
        "id": novo_id,
        "user_id": place.user_id,
        "nome": place.title,
        "endereco": place.address,
        "fotos": place.photos,
        "descricao": place.description,
        "perks": place.perks,
        "extras": place.extras,
        "preco": place.price,
        "checkin": place.checkin,
        "checkout": place.checkout,
        "pessoas": place.person,
        "quantidade": 1
    }
    produtos.append(novo_produto)
    db_manager._escrever_dados(db_manager.produtos_path, produtos)
    return {"id": novo_produto["id"], "title": novo_produto["nome"], "address": novo_produto["endereco"]}

@router.get("/", response_model=List[PlaceOut])
def list_places():
    produtos = db_manager.get_all_produtos()
    return [{"id": p["id"], "title": p["nome"], "address": p.get("endereco", "")} for p in produtos]

#adicionando endpoint para pegar lugares publicados pelo usuario logado
@router.get("/user/{user_id}", response_model=List[PlaceOut])
def list_places_by_user(user_id: int):
    produtos = db_manager.get_all_produtos()
    user_places = [
        {
            "id": p["id"],
            "title": p["nome"],
            "address": p.get("endereco", ""),
            "photos": p.get("fotos", []),
            "description": p.get("descricao", ""),
            "perks": p.get("perks", []) if isinstance(p.get("perks", []), list) else [],
            "extras": p.get("extras", ""),
            "price": p.get("preco", 0),
            "checkin": p.get("checkin", ""),
            "checkout": p.get("checkout", ""),
            "person": p.get("pessoas", 1),
        }
        for p in produtos if str(p.get("user_id")) == str(user_id)
    ]

    return user_places

#retorna todos os lugares cadastrados
@router.get("/all", response_model=List[PlaceOut])
def list_all_places():
    produtos = db_manager.get_all_produtos()
    return [
        {
            "id": p.get("id", 0),
            "title": p.get("nome", ""),
            "address": p.get("endereco", ""),
            "photos": p.get("fotos", []) if isinstance(p.get("fotos", []), list) else [],
            "description": p.get("descricao", ""),
            "perks": p.get("perks", []) if isinstance(p.get("perks", []), list) else [],
            "extras": p.get("extras", ""),
            "price": float(p.get("preco", 0)),
            "checkin": p.get("checkin", ""),
            "checkout": p.get("checkout", ""),
            "person": int(p.get("pessoas", 1)),
        }
        for p in produtos
    ]

#retorna dados de um post especifico
@router.get("/{place_id}", response_model=PlaceOut)
def get_place_by_id(place_id: int):
    produtos = db_manager.get_all_produtos()
    for p in produtos:
        if p["id"] == place_id:
            return {
                "id": p["id"],
                "title": p["nome"],
                "address": p.get("endereco", ""),
                "photos": p.get("fotos", []),
                "description": p.get("descricao", ""),
                "perks": p.get("perks", []) if isinstance(p.get("perks", []), list) else [],
                "extras": p.get("extras", ""),
                "price": p.get("preco", 0),
                "checkin": p.get("checkin", ""),
                "checkout": p.get("checkout", ""),
                "person": p.get("pessoas", 1),
            }
    raise HTTPException(status_code=404, detail="Acomodação não encontrada")

#Atualiza posts
from schemas import PlaceUpdate

@router.put("/{place_id}", response_model=PlaceOut)
def update_place(place_id: int, updated_place: PlaceUpdate):
    produtos = db_manager.get_all_produtos()
    for idx, p in enumerate(produtos):
        if p["id"] == place_id:
            # Remove fotos excluídas (do disco)
            if updated_place.deleted_photos:
                for photo in updated_place.deleted_photos:
                    photo_path = Path(UPLOAD_DIR) / Path(photo).name  # garante segurança
                    if photo_path.exists():
                        os.remove(photo_path)

            # Atualiza os dados com as novas informações (a lista de fotos é substituída)
            produtos[idx] = {
                **p,
                "nome": updated_place.title,
                "endereco": updated_place.address,
                "fotos": updated_place.photos,
                "descricao": updated_place.description,
                "perks": updated_place.perks,
                "extras": updated_place.extras,
                "preco": updated_place.price,
                "checkin": updated_place.checkin,
                "checkout": updated_place.checkout,
                "pessoas": updated_place.person,
            }
            db_manager._escrever_dados(db_manager.produtos_path, produtos)

            return {
                "id": p["id"],
                "title": updated_place.title,
                "address": updated_place.address,
                "photos": updated_place.photos,
                "description": updated_place.description,
                "perks": updated_place.perks,
                "extras": updated_place.extras,
                "price": updated_place.price,
                "checkin": updated_place.checkin,
                "checkout": updated_place.checkout,
                "person": updated_place.person,
            }
    raise HTTPException(status_code=404, detail="Acomodação não encontrada")

#Deleta posts
@router.delete("/{place_id}")
def delete_place(place_id: int):
    produtos = db_manager.get_all_produtos()
    updated_produtos = [p for p in produtos if p["id"] != place_id]

    if len(updated_produtos) == len(produtos):
        raise HTTPException(status_code=404, detail="Acomodação não encontrada")

    db_manager._escrever_dados(db_manager.produtos_path, updated_produtos)
    return {"message": "Acomodação excluída com sucesso"}