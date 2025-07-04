import { exec } from "child_process";

const workingDir = process.cwd().replace(/\\/g, "/");

// TODOS os argumentos em uma única string, com aspas internas escapadas (`"`)
const wtArgs = `--maximized -p \\"ECO - Fragmento do Amanhã\\" -d \\"${workingDir}\\" node index.js`;

// Passa isso como uma única string no ArgumentList
const command = `powershell -Command "Start-Process -FilePath wt.exe -ArgumentList '${wtArgs}' -Verb RunAs"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erro: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ stderr: ${stderr}`);
    return;
  }
  console.log(`✅ stdout: ${stdout}`);
});
