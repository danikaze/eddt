let win: Electron.BrowserWindow;

function stringify(data: unknown): string | number {
  if (typeof data === 'number' || typeof data === 'string') return data;
  return JSON.stringify(data);
}

function sendMessage(type: 'log' | 'error', ...args: unknown[]): void {
  const text = args.map(stringify).join(' ');
  win.webContents.send(IPC_MSG_CHANNEL, { type, text });
}

function centerIn(text: string, size: number, char: string = ' '): string {
  const left = Math.max(0, Math.floor((size - text.length) / 2));
  const right = Math.max(0, size - text.length - left);
  return `${char.repeat(left)}${text}${char.repeat(right)}`;
}

function row(
  [key, value]: [string, string],
  keyLen: number,
  valLen: number,
  space: string = ' ',
  left: string = '│',
  center: string = '│',
  right: string = '│'
): string {
  const keyCell = centerIn(key, keyLen + 2, space);
  const valCell = centerIn(value, valLen + 2, space);
  return `${left}${keyCell}${center}${valCell}${right}`;
}

function toTable<T extends {}>(
  data: T,
  header: [string, string] = ['key', 'value']
): string {
  let keyLen = header[0].length;
  let valLen = header[1].length;
  const entries = Object.entries(data);
  // calculate lenghts
  entries.forEach(([key, value], i) => {
    entries[i][1] = String(stringify(value));
    valLen = Math.max(valLen, (entries[i][1] as string).length);
    keyLen = Math.max(keyLen, key.length);
  });

  // create table
  const hr = [
    row(['', ''], keyLen, valLen, '-', '┌', '┬', '┐'),
    row(header, keyLen, valLen),
    row(['', ''], keyLen, valLen, '-', '├', '┼', '┤'),
  ].join('\n');
  const rows = entries
    .map((d) => row(d as [string, string], keyLen, valLen))
    .join('\n');
  const footer = row(['', ''], keyLen, valLen, '-', '└', '┴', '┘');

  return `${hr}\n${rows}\n${footer}`;
}

export function initMessages(window: Electron.BrowserWindow) {
  win = window;
}

export const msgLog = sendMessage.bind(undefined, 'log');
export const msgError = sendMessage.bind(undefined, 'error');
export const msgTable = (data: {}) => sendMessage('log', toTable(data));
