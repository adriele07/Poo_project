# Backend/usuario.py
from .db_manager import DBManager

db = DBManager() # Instancia o nosso gerenciador

class Usuario:
    def __init__(self, nome, email, senha, id=None):
        self.id = id
        self.nome = nome
        self.email = email
        self.senha = senha

    def save(self):
        """Salva um novo usuário no banco de dados."""
        if db.get_usuario_by_email(self.email):
            print(f"Erro: Email {self.email} já cadastrado.")
            return None

        dados = {'nome': self.nome, 'email': self.email, 'senha': self.senha}
        usuario_salvo = db.salvar_novo_usuario(dados)
        self.id = usuario_salvo['id'] # Atualiza o objeto com o ID retornado pelo DB
        print(f"Usuário '{self.nome}' salvo com sucesso com o ID {self.id}.")
        return self

    @classmethod
    def find_by_email(cls, email):
        """Busca um usuário pelo email e retorna uma instância da classe."""
        user_data = db.get_usuario_by_email(email)
        if user_data:
            return cls(**user_data) # Cria uma instância da classe com os dados
        return None