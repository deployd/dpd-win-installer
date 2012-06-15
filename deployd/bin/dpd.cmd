@echo off

set node="%~dp0\..\tools\node.exe"
set script="%~dp0\..\node_modules\deployd\bin\dpd"

@IF EXIST %node% (
  %node% %script% -m "%~dp0\..\tools\mongod.exe" %*
) ELSE (
  node  %script% %*
)