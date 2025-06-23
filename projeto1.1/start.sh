#!/bin/bash

# Diretórios
BACK_DIR="./back-end"
FRONT_DIR="./front-end"

# Verificações de diretório
if [ ! -d "$BACK_DIR" ]; then
  echo "❌ Diretório de back-end não encontrado em $BACK_DIR"
  exit 1
fi

if [ ! -d "$FRONT_DIR" ]; then
  echo "❌ Diretório de front-end não encontrado em $FRONT_DIR"
  exit 1
fi

echo "🔍 Verificando ambiente Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale o Python 3.9+ e tente novamente."
    exit 1
fi

# Criar e ativar venv se não existir
if [ ! -d "$BACK_DIR/venv" ]; then
    echo "🛠️ Criando ambiente virtual para o back-end..."
    python3 -m venv "$BACK_DIR/venv"
    source "$BACK_DIR/venv/bin/activate"
    pip install --upgrade pip
    pip install -r "$BACK_DIR/requirements.txt"
else
    source "$BACK_DIR/venv/bin/activate"
    pip install -r "$BACK_DIR/requirements.txt"
fi

# 🔄 Atualizar requirements.txt com dependências instaladas
echo "🔄 Atualizando requirements.txt com dependências atuais..."
pip freeze > "$BACK_DIR/requirements.txt"

echo "✅ Back-end pronto."

# Instalar dependências do front-end
echo "📦 Verificando dependências do front-end..."
cd "$FRONT_DIR"
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências do front-end..."
    npm install
fi

echo "✅ Front-end pronto."

# Voltar à raiz do projeto
cd ..

# Iniciar o back-end
echo "🚀 Iniciando o back-end..."
cd "$BACK_DIR"
source venv/bin/activate
uvicorn main:app --reload --port 8000 &
BACK_PID=$!

# Iniciar o front-end
cd ../front-end
echo "🚀 Iniciando o front-end..."
npm run dev &
FRONT_PID=$!

# Abrir no navegador
sleep 2
xdg-open http://localhost:5173

# Aguardar processos
wait $BACK_PID
wait $FRONT_PID