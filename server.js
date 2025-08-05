const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const CURRENT_TEXT_FILE = './current_text.json';
const TEXT_HISTORY_FILE = './text-history.json';
const CURRENT_TXT_FILE = './current_text.txt';

app.use(express.json());
app.use(express.static('public'));

app.get('/api/current', (req, res) => {
  const data = JSON.parse(fs.readFileSync(CURRENT_TEXT_FILE, 'utf8'));
  res.json(data);
});

app.get('/api/history', (req, res) => {
  const data = JSON.parse(fs.readFileSync(TEXT_HISTORY_FILE, 'utf8'));
  res.json(data);
});

app.post('/api/update', (req, res) => {
  const newText = req.body.text;

  fs.writeFileSync(CURRENT_TEXT_FILE, JSON.stringify({ text: newText }, null, 2));
  fs.writeFileSync(CURRENT_TXT_FILE, newText);

  const history = JSON.parse(fs.readFileSync(TEXT_HISTORY_FILE, 'utf8'));
  history.unshift(newText);
  fs.writeFileSync(TEXT_HISTORY_FILE, JSON.stringify(history.slice(0, 100), null, 2));

  res.json({ success: true });
});

app.get('/current_text.txt', (req, res) => {
  res.sendFile(path.join(__dirname, CURRENT_TXT_FILE));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
