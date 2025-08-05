import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { newText } = req.body;
    
    // Define file paths
    const currentTextPath = path.join(process.cwd(), 'public', 'current_text.txt');
    const historyPath = path.join(process.cwd(), 'public', 'text_history.txt');
    
    // Read current history
    let history = [];
    if (fs.existsSync(historyPath)) {
      const historyContent = fs.readFileSync(historyPath, 'utf8');
      history = historyContent.split('\n').filter(Boolean);
    }
    
    // Add current text to history before updating
    if (fs.existsSync(currentTextPath)) {
      const currentContent = fs.readFileSync(currentTextPath, 'utf8');
      if (currentContent.trim()) {
        history.unshift(currentContent.trim());
      }
    }
    
    // Keep only the last 10 entries
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    
    // Update current text file
    fs.writeFileSync(currentTextPath, newText);
    
    // Update history file
    fs.writeFileSync(historyPath, history.join('\n'));
    
    res.status(200).json({
      currentText: newText,
      history: history
    });
  } catch (error) {
    console.error('Error updating text:', error);
    res.status(500).json({ message: 'Error updating text' });
  }
}
