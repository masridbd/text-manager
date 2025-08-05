export default function handler(req, res) {
    // Get current text from localStorage via client
    const currentText = "Welcome! Start by entering new text"; // Default text
    
    // In a real app, you'd get this from a database
    // For demo, we'll use a simple approach
    res.setHeader('Content-Type', 'text/plain');
    res.send(currentText);
}
