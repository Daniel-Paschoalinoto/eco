/**
 * ECO - Fragmento do Amanhã
 * Copyright (c) 2025 Daniel Paschoalinoto
 *
 * Este trabalho está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.
 * Para visualizar uma cópia desta licença, visite http://creativecommons.org/licenses/by-nc-nd/4.0/.
 */

// utils/executeSpawn.js
import { spawn as _spawn } from "child_process";

function executeSpawn(command, args = [], options = {}) {
  const child = _spawn(command, args, options);

  const promise = new Promise((resolve, reject) => {
    let stdout = "", stderr = "";
    child.stdout?.on("data", d => stdout += d);
    child.stderr?.on("data", d => stderr += d);
    child.on("close", code => {
      if (code === 0) resolve(stdout.trim());
      //   else {
      //     const err = new Error(`Código ${code}`);
      //     err.stderr = stderr.trim();
      //     reject(err);
      //   }
    });
    child.on("error", reject);
  });

  // anexa o processo à promise
  promise.child = child;
  return promise;
}

export default executeSpawn;
