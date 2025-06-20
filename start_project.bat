@echo off
setlocal enabledelayedexpansion

REM Diretórios
set BACK_DIR=back-end
set FRONT_DIR=front-end

REM Verificar existência dos diretórios
if not exist "%BACK_DIR%" (
    echo ❌ Diretório de back-end não encontrado em %BACK_DIR%
    exit /b 1
)

if not exist "%FRONT_DIR%" (
    echo ❌ Diretório de front-end não encontrado em %FRONT_DIR%
    exit /b 1
)

REM Verificar Python
where python >nul 2>nul
if errorlevel 1 (
    echo ❌ Python não encontrado. Instale o Python 3.9+ e tente novamente.
    exit /b 1
)

REM Criar venv se não existir
if not exist "%BACK_DIR%\venv" (
    echo 🛠️ Criando ambiente virtual para o back-end...
    python -m venv %BACK_DIR%\venv
    call %BACK_DIR%\venv\Scripts\activate.bat
    pip install --upgrade pip
    pip install -r %BACK_DIR%\requirements.txt
) else (
    call %BACK_DIR%\venv\Scripts\activate.bat
)

echo ✅ Back-end pronto.

REM Instalar dependências do front-end
echo 📦 Verificando dependências do front-end...
cd %FRONT_DIR%
if not exist "node_modules" (
    echo 📥 Instalando dependências do front-end...
    npm install
)

echo ✅ Front-end pronto.

REM Voltar para o diretório raiz
cd ..

REM Iniciar o back-end
echo 🚀 Iniciando o back-end...
start cmd /k "cd %BACK_DIR% && call venv\Scripts\activate.bat && uvicorn main:app --reload --port 8000"

REM Iniciar o front-end
echo 🚀 Iniciando o front-end...
start cmd /k "cd %FRONT_DIR% && npm run dev"

REM Esperar alguns segundos e abrir no navegador
timeout /t 2 >nul
start http://localhost:5173