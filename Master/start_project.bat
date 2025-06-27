@echo off
cls

echo [AVISO] Este script assume que voce ja instalou o Python 3.11.
echo Pressione qualquer tecla para continuar...
pause >nul
cls

echo --- CONFIGURANDO O PROJETO (isso sera rapido se ja foi feito antes) ---
echo.

echo [INFO] Configurando Back-End (Python)...

rem Verifica se o ambiente virtual JA EXISTE. Se sim, pula a instalacao.
if exist "back-end\venv\Scripts\activate.bat" goto backend_ok

rem Se o ambiente nao existe, a instalacao e executada.
echo    [INFO] Ambiente virtual nao encontrado. Instalando dependencias...
echo    Criando novo ambiente virtual...
python -m venv back-end\venv
if errorlevel 1 goto error_venv

echo    Atualizando ferramentas de instalacao (pip, setuptools)...
call back-end\venv\Scripts\activate.bat && python -m pip install --upgrade pip setuptools wheel
if errorlevel 1 goto error_pip

echo    Instalando dependencias (requirements.txt)...
call back-end\venv\Scripts\activate.bat && python -m pip install -r back-end\requirements.txt
if errorlevel 1 goto error_pip

:backend_ok
echo [OK] Back-End pronto.
echo.

echo [INFO] Configurando Front-End (Node.js)...
rem A execucao do npm install garante que todas as dependencias estao corretas.
echo    [INFO] Verificando e instalando dependencias (pode demorar na primeira vez)...
cmd /c "cd front-end && npm install"
if errorlevel 1 goto error_npm_install

:frontend_ok
echo [OK] Front-End pronto.
echo.

echo --- INICIANDO SERVIDORES ---
start "Servidor Back-End" cmd /k "cd back-end && call venv\Scripts\activate.bat && uvicorn main:app --reload --port 8000"
start "Servidor Front-End" cmd /k "cd front-end && npm run dev"

echo.
echo [SUCESSO] Projeto iniciado!
echo Aguardando 10 segundos antes de abrir o navegador...
timeout /t 10 >nul
start "" "http://localhost:5173"
goto end

:error_venv
echo [ERRO] Falha ao criar o ambiente virtual. Verifique a instalacao do Python 3.11.
goto end

:error_pip
echo [ERRO] Falha ao instalar as dependencias do Python. Verifique o 'requirements.txt'.
goto end

:error_npm_install
echo [ERRO] Falha ao instalar as dependencias do Node.js.
goto end

:end
echo.
echo Para parar os servidores, feche as novas janelas do terminal.
pause
