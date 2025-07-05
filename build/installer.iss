[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Setup]
AppName=ECO - Fragmento do Amanhã
AppVerName=ECO - Fragmento do Amanhã
AppVersion=0.5.1
DefaultDirName={autopf}\ECO
AppPublisher=Daniel Paschoalinoto
WindowShowCaption=ECO - Fragmento do Amanhã
AppPublisherURL=https://github.com/Daniel-Paschoalinoto
Uninstallable=yes
UninstallDisplayName=ECO - Fragmento do Amanhã
OutputBaseFilename=ECO
OutputDir=.
DisableDirPage=yes
DisableProgramGroupPage=yes
ChangesEnvironment=yes
AlwaysShowDirOnReadyPage=yes
PrivilegesRequired=admin
Compression=lzma2
SolidCompression=yes
SetupIconFile=..\assets\icons\ECO.ico
WizardImageFile=..\assets\icons\ECO.bmp
WizardSmallImageFile=..\assets\icons\ECO-mini.bmp
UninstallDisplayIcon={app}\assets\icons\ECO.ico

VersionInfoCompany=Daniel Paschoalinoto
VersionInfoProductName=ECO - Fragmento do Amanhã
VersionInfoVersion=0.5.1
VersionInfoProductVersion=0.5.1
VersionInfoDescription=Instalador do ECO

[Files]
Source: "..\assets\*"; DestDir: "{app}\assets"; Flags: ignoreversion recursesubdirs
Source: "..\src\*"; DestDir: "{app}\src"; Flags: ignoreversion recursesubdirs
Source: "..\game.js"; DestDir: "{app}"; Flags: ignoreversion

[Registry]
Root: HKCU; Subkey: "Environment"; \
    ValueType: expandsz; ValueName: "Path"; \
    ValueData: "{olddata};{app}\assets\player"; \
    Flags: preservestringtype; \
    Check: NotInPath

[Run]
Filename: "winget"; Parameters: "install --id Microsoft.WindowsTerminal --exact --silent --accept-package-agreements --accept-source-agreements"; \
    StatusMsg: "Instalando o Windows Terminal..."; Check: not IsWTInstalled; Flags: runhidden

Filename: "winget"; Parameters: "install --id OpenJS.NodeJS --silent --accept-package-agreements --accept-source-agreements"; \
    StatusMsg: "Instalando o Node.js, pode ser necessário reiniciar o computador..."; Check: not IsNodeInstalled; Flags: runhidden

[Icons]
Name: "{userdesktop}\ECO"; Filename: "wt.exe"; \
    Parameters: "--maximized -d ""{app}"" node ""{app}\game.js"""; \
    IconFilename: "{app}\assets\icons\ECO.ico";

Name: "{userstartmenu}\ECO - Fragmento do Amanhã"; Filename: "wt.exe"; \
    Parameters: "--maximized -p ""ECO - Fragmento do Amanhã"" -d ""{app}"" node ""{app}\game.js"""; \
    IconFilename: "{app}\assets\icons\ECO.ico"
    
[UninstallDelete]
Type: files; Name: "{userdesktop}\ECO.lnk"
Type: filesandordirs; Name: "{app}\save"
Type: filesandordirs; Name: "{app}"

[Code]
function NotInPath: Boolean;
var
  Path: string;
  AppPath: string;
begin
  if RegQueryStringValue(HKCU, 'Environment', 'Path', Path) then
  begin
    AppPath := ExpandConstant('{app}\assets\player');
    Result := Pos(AppPath, Path) = 0;
  end
  else
    Result := True;
end;

function IsWTInstalled: Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec('cmd.exe', '/C where wt.exe > nul 2>&1', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

function IsNodeInstalled: Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec('cmd.exe', '/C where node > nul 2>&1', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
end;

procedure AddToWindowsDefenderWhitelist(Dir: string);
var
  PSFile: string;
  ResultCode: Integer;
begin
  PSFile := ExpandConstant('{tmp}\AddDefenderWhitelist.ps1');
  
  SaveStringToFile(PSFile,
    '$exclusionPath = "' + Dir + '"' + #13#10 +
    'Add-MpPreference -ExclusionPath $exclusionPath' + #13#10,
  False);

  Exec('powershell.exe', '-ExecutionPolicy Bypass -File "' + PSFile + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
end;

procedure AddWindowsTerminalProfile;
var
  WTConfigPath, PSFile: string;
  ResultCode: Integer;
begin
  // Caminho para o arquivo de configurações do Windows Terminal
  WTConfigPath := ExpandConstant('{localappdata}\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json');

  // Cria o script PowerShell que fará todo o trabalho
  PSFile := ExpandConstant('{tmp}\AddWTProfile.ps1');
  
  SaveStringToFile(PSFile,
    '$configPath = "' + WTConfigPath + '"' + #13#10 +
    '$iconPath = "' + ExpandConstant('{app}\assets\icons\ECO.ico') + '"' + #13#10 +
    '' + #13#10 +
    '$newProfile = @{' + #13#10 +
    '    "colorScheme" = "Campbell"' + #13#10 +
    '    "commandline" = "node game.js"' + #13#10 +
    '    "cursorHeight" = 20' + #13#10 +
    '    "cursorShape" = "vintage"' + #13#10 +
    '    "experimental.retroTerminalEffect" = $true' + #13#10 +
    '    "font" = @{' + #13#10 +
    '        "cellHeight" = "2"' + #13#10 +
    '        "face" = "Cascadia Code"' + #13#10 +
    '        "size" = 20' + #13#10 +
    '    }' + #13#10 +
    '    "guid" = "{a3f1b894-fa11-4f25-8c38-ec0a0f4e3410}"' + #13#10 +
    '    "hidden" = $false' + #13#10 +
    '    "icon" = $iconPath' + #13#10 +
    '    "name" = "ECO - Fragmento do Amanhã"' + #13#10 +
    '    "padding" = "30"' + #13#10 +
    '    "scrollbarState" = "hidden"' + #13#10 +
    '    "startingDirectory" = "' + ExpandConstant('{app}') + '"' + #13#10 +
    '}' + #13#10 +
    '' + #13#10 +
    'try {' + #13#10 +
    '    # Carrega o JSON existente ou cria um novo' + #13#10 +
    '    if (Test-Path $configPath) {' + #13#10 +
    '        $json = Get-Content $configPath -Raw | ConvertFrom-Json' + #13#10 +
    '    } else {' + #13#10 +
    '        $json = @{ profiles = @{ list = @() } }' + #13#10 +
    '    }' + #13#10 +
    '' + #13#10 +
    '    # Garante que a estrutura profiles.list exista' + #13#10 +
    '    if (-not $json.profiles) { $json.profiles = @{} }' + #13#10 +
    '    if (-not $json.profiles.list) { $json.profiles.list = @() }' + #13#10 +
    '' + #13#10 +
    '    # Remove o perfil se já existir' + #13#10 +
    '    $json.profiles.list = @($json.profiles.list | Where-Object { $_.guid -ne "{a3f1b894-fa11-4f25-8c38-ec0a0f4e3410}" })' + #13#10 +
    '' + #13#10 +
    '    # Adiciona o novo perfil' + #13#10 +
    '    $json.profiles.list += $newProfile' + #13#10 +
    '' + #13#10 +
    '    # Faz backup do arquivo original' + #13#10 +
    '    if (Test-Path $configPath) {' + #13#10 +
    '        Copy-Item $configPath ($configPath + ".bak") -Force' + #13#10 +
    '    }' + #13#10 +
    '' + #13#10 +
    '    # Converte para JSON com formatação correta e salva' + #13#10 +
    '    $json | ConvertTo-Json -Depth 10 | Out-File $configPath -Encoding utf8 -Force' + #13#10 +
    '    Write-Host "Perfil adicionado com sucesso"' + #13#10 +
    '} catch {' + #13#10 +
    '    Write-Host "Erro ao adicionar perfil: $_"' + #13#10 +
    '    exit 1' + #13#10 +
    '}', False);

  // Executa o script PowerShell
  if not Exec('powershell.exe', '-ExecutionPolicy Bypass -File "' + PSFile + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) or (ResultCode <> 0) then
  begin
    MsgBox('Não foi possível adicionar o perfil ao Windows Terminal. O aplicativo ainda funcionará, mas sem o perfil personalizado.', mbInformation, MB_OK);
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  PSFile, ShortcutDesktop, ShortcutStartMenu: string;
  ResultCode: Integer;
begin
  if CurStep = ssPostInstall then
  begin
    AddToWindowsDefenderWhitelist(ExpandConstant('{app}'));
    AddWindowsTerminalProfile;

    ShortcutDesktop := ExpandConstant('{userdesktop}\ECO.lnk');
    ShortcutStartMenu := ExpandConstant('{userstartmenu}\ECO - Fragmento do Amanhã.lnk');
    PSFile := ExpandConstant('{tmp}\CreateShortcuts.ps1');

    SaveStringToFile(PSFile,
      '$WshShell = New-Object -ComObject WScript.Shell' + #13#10 +

      '# Área de Trabalho' + #13#10 +
      '$desktop = $WshShell.CreateShortcut("' + ShortcutDesktop + '")' + #13#10 +
      '$desktop.TargetPath = "wt.exe"' + #13#10 +
      '$desktop.Arguments = "--maximized -p ""ECO - Fragmento do Amanhã"" -d ""' + ExpandConstant('{app}') + '"" node ""' + ExpandConstant('{app}\game.js') + '"""' + #13#10 +
      '$desktop.IconLocation = "' + ExpandConstant('{app}\assets\icons\ECO.ico') + '"' + #13#10 +
      '$desktop.WorkingDirectory = "' + ExpandConstant('{app}') + '"' + #13#10 +
      '$desktop.Save()' + #13#10 +

      '[byte[]]$bytes = [System.IO.File]::ReadAllBytes("' + ShortcutDesktop + '")' + #13#10 +
      '$bytes[0x15] = $bytes[0x15] -bor 0x20' + #13#10 +
      '[System.IO.File]::WriteAllBytes("' + ShortcutDesktop + '", $bytes)' + #13#10 +

      '# Menu Iniciar' + #13#10 +
      '$startmenu = $WshShell.CreateShortcut("' + ShortcutStartMenu + '")' + #13#10 +
      '$startmenu.TargetPath = "wt.exe"' + #13#10 +
      '$startmenu.Arguments = "--maximized -p ""ECO - Fragmento do Amanhã"" -d ""' + ExpandConstant('{app}') + '"" node ""' + ExpandConstant('{app}\game.js') + '"""' + #13#10 +
      '$startmenu.IconLocation = "' + ExpandConstant('{app}\assets\icons\ECO.ico') + '"' + #13#10 +
      '$startmenu.WorkingDirectory = "' + ExpandConstant('{app}') + '"' + #13#10 +
      '$startmenu.Save()' + #13#10 +

      '[byte[]]$bytes2 = [System.IO.File]::ReadAllBytes("' + ShortcutStartMenu + '")' + #13#10 +
      '$bytes2[0x15] = $bytes2[0x15] -bor 0x20' + #13#10 +
      '[System.IO.File]::WriteAllBytes("' + ShortcutStartMenu + '", $bytes2)'
    , False);

    Exec('powershell.exe', '-ExecutionPolicy Bypass -File "' + PSFile + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;
end;

procedure RemoveWindowsTerminalProfile;
var
  WTConfigPath, PSFile: string;
  ResultCode: Integer;
begin
  WTConfigPath := ExpandConstant('{localappdata}\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json');
  PSFile := ExpandConstant('{tmp}\RemoveWTProfile.ps1');

  SaveStringToFile(PSFile,
    '$configPath = "' + WTConfigPath + '"' + #13#10 +
    'try {' + #13#10 +
    '  if (Test-Path $configPath) {' + #13#10 +
    '    $json = Get-Content $configPath -Raw | ConvertFrom-Json' + #13#10 +
    '    if ($json.profiles -and $json.profiles.list) {' + #13#10 +
    '      $json.profiles.list = $json.profiles.list | Where-Object { $_.name -ne "ECO - Fragmento do Amanhã" -and $_.guid -ne "{a3f1b894-fa11-4f25-8c38-ec0a0f4e3410}" }' + #13#10 +
    '      $json | ConvertTo-Json -Depth 10 | Out-File $configPath -Encoding utf8 -Force' + #13#10 +
    '      Write-Host "Perfil ECO removido com sucesso."' + #13#10 +
    '    }' + #13#10 +
    '  }' + #13#10 +
    '} catch {' + #13#10 +
    '  Write-Host "Erro ao remover perfil ECO: $_"' + #13#10 +
    '  exit 1' + #13#10 +
    '}', False);

  Exec('powershell.exe', '-ExecutionPolicy Bypass -File "' + PSFile + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  if ResultCode <> 0 then
    MsgBox('Não foi possível remover o perfil do Windows Terminal.', mbInformation, MB_OK);
end;


function InitializeUninstall(): Boolean;
var
  ResultCode: Integer;
begin
  RemoveWindowsTerminalProfile;
  if MsgBox('Quer remover o Node.js? Caso escolha SIM aguarde...', mbConfirmation, MB_YESNO) = IDYES then
  begin
    Exec('cmd.exe', '/C winget uninstall --id OpenJS.NodeJS --silent', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  if MsgBox('Quer remover o Windows Terminal? Caso escolha SIM aguarde...', mbConfirmation, MB_YESNO) = IDYES then
  begin
    Exec('cmd.exe', '/C winget uninstall --id Microsoft.WindowsTerminal --silent', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  end;

  Result := True;
end;