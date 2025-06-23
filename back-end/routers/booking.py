from fastapi import APIRouter, HTTPException
from schemas import BookingCreate, BookingOut
from typing import List
from db_manager import DBManager

router = APIRouter(prefix="/bookings", tags=["bookings"])
db_manager = DBManager()

@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate):
    vendas = db_manager._ler_dados(db_manager.vendas_path)
    produtos = db_manager._ler_dados(db_manager.produtos_path)

    place = next((p for p in produtos if p.get('id') == booking.place_id), None)
    if not place:
        raise HTTPException(status_code=404, detail="Acomodação não encontrada")

    novo_id = max([v.get('id', 0) for v in vendas] + [0]) + 1

    nova_venda = {
        "id": novo_id,
        "user_id": booking.user_id,
        "place_id": booking.place_id,
        "check_in": booking.check_in,
        "check_out": booking.check_out,
        "price": booking.price,
        "guests": booking.guests,
        "titulo": place.get("nome") or place.get("title"),
        "endereco": place.get("endereco") or place.get("address"),
        "foto": booking.foto  # 👈 Agora sim, correto
    }

    vendas.append(nova_venda)
    db_manager._escrever_dados(db_manager.vendas_path, vendas)
    return nova_venda

@router.get("/", response_model=List[BookingOut])
def list_bookings():
    return db_manager._ler_dados(db_manager.vendas_path)

@router.get("/{user_id}", response_model=List[BookingOut])
def list_bookings_by_user(user_id: int):
    vendas = db_manager._ler_dados(db_manager.vendas_path)
    return [v for v in vendas if v.get("user_id") == user_id]

@router.delete("/{booking_id}")
def delete_booking(booking_id: int):
    vendas = db_manager._ler_dados(db_manager.vendas_path)
    vendas_novas = [v for v in vendas if v.get("id") != booking_id]
    if len(vendas_novas) == len(vendas):
        raise HTTPException(status_code=404, detail="Reserva não encontrada")
    db_manager._escrever_dados(db_manager.vendas_path, vendas_novas)
    return {"ok": True}