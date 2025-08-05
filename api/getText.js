
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const currentPath = path.resolve('current_text.json');
  let text = '';
  if (fs.existsSync(currentPath)) {
    text = JSON.parse(fs.readFileSync(currentPath)).text || '';
  }
  res.status(200).json({ text });
}
