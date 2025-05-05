export function setBackgroundRGB(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  const rgb = `${toHex(r)}/${toHex(g)}/${toHex(b)}`;
  const seq = `\x1b]11;rgb:${rgb}\x07`;
  process.stdout.write(seq);
}

export function setWindowTitle(title) {
  const seq = `\x1b]0;${title}\x07`;
  process.stdout.write(seq);
}
