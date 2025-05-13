@echo off
echo Configurando o Git remote...
git remote remove origin
git remote add origin https://github.com/Gabrielfelix-27/Dafe-Arquitetura.git
echo Remote configurado com sucesso!
echo.
echo Agora você pode executar:
echo git push -u origin main
echo.
pause 