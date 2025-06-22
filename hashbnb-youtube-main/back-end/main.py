# main.py
from Backend.usuario import Usuario
from Backend.produto import Produto
from Backend.venda import Venda
import os

def limpar_db_para_teste():
    """Função auxiliar para limpar os arquivos JSON antes de um novo teste."""
    print("--- Limpando banco de dados para um novo teste ---")
    db_path = os.path.join(os.path.dirname(__file__), 'Database')
    for f in ['usuarios.json', 'produtos.json', 'vendas.json']:
        with open(os.path.join(db_path, f), 'w') as file:
            file.write('[]')
    # Adiciona alguns produtos para teste
    with open(os.path.join(db_path, 'produtos.json'), 'w') as file:
        file.write("""
[
    {
        "id": 1,
        "nome": "Notebook Gamer",
        "descricao": "Notebook com placa de vídeo dedicada",
        "preco": 5500.0,
        "quantidade": 10
    },
    {
        "id": 2,
        "nome": "Mouse sem Fio",
        "descricao": "Mouse ergonômico com 6 botões",
        "preco": 150.0,
        "quantidade": 30
    }
]
        """)
    print("--- Banco de dados preparado para o teste ---\n")


def simular_cenario():
    print(">>> INICIANDO SIMULAÇÃO <<<\n")

    # 1. Cadastro de um novo usuário
    print("--- Etapa 1: Cadastro de Usuário ---")
    novo_usuario = Usuario(nome="Vitor", email="vitor@email.com", senha="123")
    novo_usuario.save()
    print("-" * 20)

    # 2. Usuário faz login (simulado)
    print("\n--- Etapa 2: Login do Usuário ---")
    usuario_logado = Usuario.find_by_email("vitor@email.com")
    if usuario_logado:
        print(f"Usuário '{usuario_logado.nome}' logado com sucesso.")
    else:
        print("Falha no login.")
        return
    print("-" * 20)

    # 3. Listar produtos disponíveis
    print("\n--- Etapa 3: Visualizando Produtos ---")
    produtos_disponiveis = Produto.find_all()
    print("Produtos disponíveis no estoque:")
    for p in produtos_disponiveis:
        print(f"  ID: {p['id']}, Nome: {p['nome']}, Estoque: {p['quantidade']}")
    print("-" * 20)

    # 4. Simular uma compra
    print("\n--- Etapa 4: Realizando uma Compra ---")
    # O usuário quer comprar 1 notebook (ID 1) e 2 mouses (ID 2)
    produto1 = Produto.find_by_id(1)
    produto2 = Produto.find_by_id(2)

    if produto1 and produto2:
        itens_carrinho = [
            {'produto_id': produto1.id, 'nome': produto1.nome, 'quantidade': 1, 'preco_unitario': produto1.preco},
            {'produto_id': produto2.id, 'nome': produto2.nome, 'quantidade': 2, 'preco_unitario': produto2.preco}
        ]

        nova_venda = Venda(usuario=usuario_logado, itens_comprados=itens_carrinho)
        nova_venda.save()
    else:
        print("Um dos produtos selecionados não foi encontrado.")
    print("-" * 20)

    # 5. Verificar estoque após a compra
    print("\n--- Etapa 5: Verificando Estoque Pós-Venda ---")
    produtos_atualizados = Produto.find_all()
    print("Estoque atualizado dos produtos:")
    for p in produtos_atualizados:
        print(f"  ID: {p['id']}, Nome: {p['nome']}, Estoque: {p['quantidade']}")
    print("-" * 20)

    print("\n>>> SIMULAÇÃO CONCLUÍDA <<<")


if __name__ == "__main__":
    limpar_db_para_teste()
    simular_cenario()