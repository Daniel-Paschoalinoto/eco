import { exec } from "child_process";

const workingDir = process.cwd().replace(/\\/g, "/");

const wtArgs = `--maximized -p \\"ECO - Fragmento do Amanhã\\" -d \\"${workingDir}\\" node game.js`;

const command = `powershell -Command "Start-Process -FilePath wt.exe -ArgumentList '${wtArgs}' -Verb RunAs"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});