from fastapi import APIRouter, HTTPException
from schemas import PlaceCreate, PlaceOut
from typing import List
from db_manager import DBManager

router = APIRouter(prefix="/places", tags=["places"])
db_manager = DBManager()

@router.post("/", response_model=PlaceOut)
def create_place(place: PlaceCreate):
    # Exemplo de criação de produto usando DBManager
    produtos = db_manager.get_all_produtos()
    novo_id = max([p.get('id', 0) for p in produtos] + [0]) + 1
    novo_produto = {"id": novo_id, "nome": place.title, "descricao": place.description, "preco": place.price, "quantidade": 1}
    produtos.append(novo_produto)
    db_manager._escrever_dados(db_manager.produtos_path, produtos)
    return {"id": novo_produto["id"], "title": novo_produto["nome"], "address": place.address}

@router.get("/", response_model=List[PlaceOut])
def list_places():
    produtos = db_manager.get_all_produtos()
    return [{"id": p["id"], "title": p["nome"], "address": p.get("descricao", "")} for p in produtos]
