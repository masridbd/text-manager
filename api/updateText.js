
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { text } = req.body;
    const currentPath = path.resolve('current_text.json');
    const historyPath = path.resolve('text-history.json');

    fs.writeFileSync(currentPath, JSON.stringify({ text }));

    let history = [];
    if (fs.existsSync(historyPath)) {
      history = JSON.parse(fs.readFileSync(historyPath));
    }
    history.unshift(text);
    fs.writeFileSync(historyPath, JSON.stringify(history.slice(0, 50)));

    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
