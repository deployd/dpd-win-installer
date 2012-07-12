@echo off
set oldpath=%PATH%
set PATH=%~dp0\..\tools;%PATH%
set node="%~dp0\..\tools\node.exe"
set script="%~dp0\..\update.js"
%node% %script% %*
set PATH=%oldpath%