@echo off

set node="%~dp0\..\tools\node.exe"
set script="%~dp0\..\node_modules\deployd\bin\dpd"

@IF EXIST %node% (
  %node% %script% %*
) ELSE (
  node  %script% %*
)
