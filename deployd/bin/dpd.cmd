@echo off

set node="%~dp0\..\tools\node.exe"
set script="%~dp0\..\node_modules\deployd\bin\dpd"

set NODE_PATH=%~dp0\..\node_modules;$NODE_PATH;

@IF EXIST %node% (
  %node% %script% -m "%~dp0\..\tools\mongod.exe" %*
) ELSE (
  node  %script% %*
)