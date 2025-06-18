from fastapi import APIRouter, HTTPException
from schemas import BookingCreate, BookingOut
from typing import List
from db_manager import DBManager

router = APIRouter(prefix="/bookings", tags=["bookings"])
db_manager = DBManager()

@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate):
    vendas = db_manager._ler_dados(db_manager.vendas_path)
    novo_id = max([v.get('id', 0) for v in vendas] + [0]) + 1
    nova_venda = {"id": novo_id, "user_id": booking.user_id, "place_id": booking.place_id, "check_in": booking.check_in, "check_out": booking.check_out, "price": booking.price, "guests": booking.guests}
    vendas.append(nova_venda)
    db_manager._escrever_dados(db_manager.vendas_path, vendas)
    return {"id": nova_venda["id"], "user_id": nova_venda["user_id"], "place_id": nova_venda["place_id"]}

@router.get("/", response_model=List[BookingOut])
def list_bookings():
    vendas = db_manager._ler_dados(db_manager.vendas_path)
    return [{"id": v["id"], "user_id": v["user_id"], "place_id": v["place_id"]} for v in vendas]
