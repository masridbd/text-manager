
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const historyPath = path.resolve('text-history.json');
  let history = [];
  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath));
  }
  res.status(200).json({ history });
}
