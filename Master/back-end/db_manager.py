import json
import os
from models import User, Booking

class DBManager:
    """ Gerencia a leitura e escrita nos arquivos JSON do banco de dados. """
    def __init__(self, db_folder='../database'):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.db_path = os.path.normpath(os.path.join(base_dir, db_folder))
        os.makedirs(self.db_path, exist_ok=True)
        self.usuarios_path = os.path.join(self.db_path, 'usuarios.json')
        self.produtos_path = os.path.join(self.db_path, 'produtos.json')
        self.vendas_path = os.path.join(self.db_path, 'vendas.json')

    def _ler_dados(self, caminho_arquivo):
        if not os.path.exists(caminho_arquivo): return []
        with open(caminho_arquivo, 'r', encoding='utf-8') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []

    def _escrever_dados(self, caminho_arquivo, dados):
        with open(caminho_arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

    def get_all_produtos(self):
        return self._ler_dados(self.produtos_path)

    def get_produto_by_id(self, produto_id: int):
        for p in self.get_all_produtos():
            if p.get('id') == produto_id: return p
        return None

    def get_usuario_by_email(self, email: str):
        for u in self._ler_dados(self.usuarios_path):
            if u.get('email') == email:
                return User(
                    id=u.get('id'),
                    name=u.get('nome'),
                    email=u.get('email'),
                    password=u.get('senha')
                )
        return None

    def create_usuario(self, usuario):
        usuarios = self._ler_dados(self.usuarios_path)
        nome = getattr(usuario, 'name', None) or getattr(usuario, 'nome', None)
        email = getattr(usuario, 'email', None)
        senha = getattr(usuario, 'password', None) or getattr(usuario, 'senha', None) or getattr(usuario, '_password', None)
        novo_id = max([u.get('id', 0) for u in usuarios] + [0]) + 1
        if any(u.get('email') == email for u in usuarios): return None
        novo_usuario = {
            "id": novo_id,
            "nome": nome.title() if nome else None,
            "email": email,
            "senha": senha
        }
        usuarios.append(novo_usuario)
        self._escrever_dados(self.usuarios_path, usuarios)
        return novo_usuario

    def get_all_bookings(self):
        return [Booking.from_dict(b) for b in self._ler_dados(self.vendas_path)]

    def create_booking(self, booking: Booking):
        vendas = self._ler_dados(self.vendas_path)
        novo_id = max([v.get('id', 0) for v in vendas] + [0]) + 1
        booking.id = novo_id
        vendas.append(booking.to_dict())
        self._escrever_dados(self.vendas_path, vendas)
        return booking

    def init_db(self):
        print("Populando o banco de dados com valores padrão...")
        produtos_padrao = [
            {"id": 1, "nome": "Notebook Gamer", "descricao": "Notebook com RTX 4090", "preco": 15000.00, "quantidade": 10},
            {"id": 2, "nome": "Mouse sem fio", "descricao": "Mouse ergonômico", "preco": 350.50, "quantidade": 50},
            {"id": 3, "nome": "Teclado Mecânico", "descricao": "Teclado com switch red", "preco": 499.90, "quantidade": 30}
        ]
        self._escrever_dados(self.produtos_path, produtos_padrao)
        self._escrever_dados(self.usuarios_path, [])
        self._escrever_dados(self.vendas_path, [])
        print("Banco de dados populado!")
