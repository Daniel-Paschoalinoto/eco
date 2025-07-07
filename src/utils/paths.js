// SPDX-License-Identifier: CC-BY-NC-ND-4.0
//
// ECO - Fragmento do Amanhã
// Autor: Daniel Paschoalinoto
// Licenciado sob a Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional
// https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.pt
//
// Você pode compartilhar este arquivo, desde que:
// - Não o utilize para fins comerciais;
// - Não o modifique nem crie obras derivadas;
// - Atribua o crédito corretamente ao autor original.

//src/utils/paths.js
import path from 'path';
import os from 'os';
import { getDesktopPath } from './systemPaths.js';

// A raiz do projeto é onde o processo Node foi iniciado.
const PROJECT_ROOT = process.cwd();
const USER_HOME_DIR = os.homedir();

// Exporta uma Promise que resolve para o objeto de caminhos
export const PATHS = (async () => {
  const desktopPath = await getDesktopPath();

  return {
    ROOT: PROJECT_ROOT,
    GAME_ENTRY: path.join(PROJECT_ROOT, 'game.js'),
    ASSETS: path.join(PROJECT_ROOT, 'assets'),
    ICONS: path.join(PROJECT_ROOT, 'assets', 'icons'),
    IMAGES: path.join(PROJECT_ROOT, 'assets', 'images'),
    MUSICS: path.join(PROJECT_ROOT, 'assets', 'musics'),
    SOUNDS: path.join(PROJECT_ROOT, 'assets', 'sounds'),
    PLAYER: path.join(PROJECT_ROOT, 'assets', 'player'),
    SAVE_DIR: path.join(PROJECT_ROOT, 'save'),
    SAVE_FILE: path.join(PROJECT_ROOT, 'save', 'save.dat'),
    ENV_FILE: path.join(PROJECT_ROOT, 'env.txt'),
    PUZZLE_DESKTOP: path.join(desktopPath, "ECO"),
    PUZZLE_HOME: path.join(USER_HOME_DIR, "ECO"),
    PUZZLE_APPDATA: path.join(process.env.APPDATA ? path.dirname(process.env.APPDATA) : path.join(USER_HOME_DIR, "AppData"), "ECO"),
  };
})();
