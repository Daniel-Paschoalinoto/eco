export function setBackgroundRGB(r, g, b) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  const rgb = `${toHex(r)}/${toHex(g)}/${toHex(b)}`;
  const seq = `\x1b]11;rgb:${rgb}\x07`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}

export function setWindowTitle(title) {
  const seq = `\x1b]0;${title}\x07`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}

export function setTabColor(r, g, b) {
  const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  const seq = `\x1b]633;SetTabColor=${hex}\x1b\\`;
  Deno.stdout.writeSync(new TextEncoder().encode(seq));
}