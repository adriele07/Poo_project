# Backend/produto.py
from .db_manager import DBManager

db = DBManager() # Instancia o nosso gerenciador

class Produto:
    def __init__(self, nome, descricao, preco, quantidade, id=None):
        self.id = id
        self.nome = nome
        self.descricao = descricao
        self.preco = float(preco)
        self.quantidade = int(quantidade)

    @classmethod
    def find_all(cls):
        """Retorna uma lista de todos os produtos."""
        return db.get_all_produtos()

    @classmethod
    def find_by_id(cls, produto_id):
        """Busca um produto pelo ID e retorna uma instância da classe."""
        produto_data = db.get_produto_by_id(produto_id)
        if produto_data:
            return cls(**produto_data)
        return None