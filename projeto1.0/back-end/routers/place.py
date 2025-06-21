from fastapi import APIRouter, HTTPException
from schemas import PlaceCreate, PlaceOut
from typing import List
from db_manager import DBManager

router = APIRouter(prefix="/places", tags=["places"])
db_manager = DBManager()

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
