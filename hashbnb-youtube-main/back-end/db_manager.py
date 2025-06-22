# Backend/db_manager.py
import json
import os

class DBManager:
    """
    Esta classe gerencia todas as interações com os arquivos JSON
    que funcionam como nosso banco de dados.
    """
    def __init__(self):
        # Constrói os caminhos para os arquivos de dados de forma dinâmica
        base_dir = os.path.dirname(os.path.abspath(__file__))
        database_dir = os.path.join(os.path.dirname(base_dir), 'Database')

        self.usuarios_path = os.path.join(database_dir, 'usuarios.json')
        self.produtos_path = os.path.join(database_dir, 'produtos.json')
        self.vendas_path = os.path.join(database_dir, 'vendas.json')

    def _ler_dados(self, caminho_arquivo):
        """Método privado para ler dados de um arquivo JSON."""
        try:
            with open(caminho_arquivo, 'r', encoding='utf-8') as f:
                # Se o arquivo estiver vazio, retorna uma lista vazia
                content = f.read()
                if not content:
                    return []
                return json.loads(content)
        except (FileNotFoundError, json.JSONDecodeError):
            # Se o arquivo não existir ou tiver erro, consideramos como vazio
            return []

    def _escrever_dados(self, caminho_arquivo, dados):
        """Método privado para escrever dados em um arquivo JSON."""
        with open(caminho_arquivo, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

    # --- Métodos para Usuários ---

    def get_usuario_by_email(self, email):
        """Busca um usuário pelo email."""
        usuarios = self._ler_dados(self.usuarios_path)
        for u in usuarios:
            if u['email'] == email:
                return u
        return None

    def salvar_novo_usuario(self, usuario_data):
        """Salva um novo usuário, atribuindo um ID automático."""
        usuarios = self._ler_dados(self.usuarios_path)
        # Define o novo ID como o maior ID existente + 1, ou 1 se for o primeiro
        novo_id = max([u.get('id', 0) for u in usuarios] + [0]) + 1
        usuario_data['id'] = novo_id
        usuarios.append(usuario_data)
        self._escrever_dados(self.usuarios_path, usuarios)
        return usuario_data

    # --- Métodos para Produtos ---

    def get_all_produtos(self):
        """Retorna a lista de todos os produtos."""
        return self._ler_dados(self.produtos_path)

    def get_produto_by_id(self, produto_id):
        """Busca um produto pelo ID."""
        produtos = self.get_all_produtos()
        for p in produtos:
            if p.get('id') == produto_id:
                return p
        return None

    def atualizar_estoque_produtos(self, produtos_a_atualizar):
        """
        Atualiza o estoque de múltiplos produtos.
        'produtos_a_atualizar' é uma lista de tuplas (id_produto, quantidade_comprada)
        """
        produtos_db = self.get_all_produtos()
        for p_db in produtos_db:
            for prod_id, qtd_comprada in produtos_a_atualizar:
                if p_db.get('id') == prod_id:
                    if p_db['quantidade'] >= qtd_comprada:
                        p_db['quantidade'] -= qtd_comprada
                    else:
                        # Se um produto não tiver estoque, a operação falha.
                        raise ValueError(f"Estoque insuficiente para o produto ID {prod_id}")

        self._escrever_dados(self.produtos_path, produtos_db)
        return True


    # --- Métodos para Vendas ---

    def registrar_venda(self, venda_data):
        """Registra uma nova venda e atualiza o estoque dos produtos."""
        vendas = self._ler_dados(self.vendas_path)

        # Extrai os produtos da venda para atualizar o estoque
        produtos_vendidos = []
        for item in venda_data['itens_comprados']:
            produtos_vendidos.append((item['produto_id'], item['quantidade']))

        # Chama o método para atualizar o estoque
        self.atualizar_estoque_produtos(produtos_vendidos)

        # Atribui um novo ID para a venda
        novo_id = max([v.get('id', 0) for v in vendas] + [0]) + 1
        venda_data['id'] = novo_id
        vendas.append(venda_data)
        self._escrever_dados(self.vendas_path, vendas)
        return venda_data