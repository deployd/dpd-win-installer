@echo off

set node="%~dp0\..\tools\node.exe"
set script="%~dp0\..\update.js"

@IF EXIST %node% (
  %node% %script% %*
) ELSE (
  node  %script% %*
)