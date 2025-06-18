# Backend/venda.py
from .db_manager import DBManager
from datetime import datetime

db = DBManager() # Instancia o nosso gerenciador

class Venda:
    def __init__(self, usuario, itens_comprados: list, id=None):
        self.id = id
        self.usuario_id = usuario.id
        self.data_venda = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        # Itens comprados deve ser uma lista de dicionários
        # Ex: [{'produto_id': 1, 'nome': 'Notebook', 'quantidade': 1, 'preco_unitario': 5000}]
        self.itens_comprados = itens_comprados
        self.total_venda = sum(item['quantidade'] * item['preco_unitario'] for item in itens_comprados)

    def save(self):
        """Salva a venda no banco de dados."""
        dados_venda = {
            'usuario_id': self.usuario_id,
            'data_venda': self.data_venda,
            'itens_comprados': self.itens_comprados,
            'total_venda': self.total_venda
        }
        try:
            venda_registrada = db.registrar_venda(dados_venda)
            self.id = venda_registrada['id']
            print(f"Venda {self.id} registrada com sucesso!")
            return self
        except ValueError as e:
            print(f"Erro ao registrar venda: {e}")
            return None