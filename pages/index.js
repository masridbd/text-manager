import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const CORRECT_PIN = "234432"; // Change this to your desired PIN

export default function Home() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [newText, setNewText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [textHistory, setTextHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authenticated) {
      fetch('/current_text.txt')
        .then(res => res.text())
        .then(text => setCurrentText(text))
        .catch(err => console.error(err));

      fetch('/text_history.txt')
        .then(res => res.text())
        .then(text => setTextHistory(text.split('\n').filter(Boolean)))
        .catch(err => console.error(err));
    }
  }, [authenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newText }),
      });

      if (response.ok) {
        const result = await response.json();
        setCurrentText(result.currentText);
        setTextHistory(result.history);
        setNewText('');
      }
    } catch (err) {
      console.error('Error updating text:', err);
    }
  };

  if (!authenticated) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Text Manager - Login</title>
          <meta name="description" content="PIN-protected text manager" />
        </Head>

        <main className={styles.authContainer}>
          <div className={styles.authCard}>
            <h1 className={styles.title}>Welcome</h1>
            <p className={styles.subtitle}>Please enter your PIN to continue</p>
            
            <form onSubmit={handlePinSubmit} className={styles.authForm}>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={styles.pinInput}
                placeholder="Enter PIN"
                required
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.authButton}>
                Continue
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Text Manager</title>
        <meta name="description" content="Manage your text content" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Text Manager</h1>
        
        <form onSubmit={handleTextSubmit} className={styles.textForm}>
          <label htmlFor="newText" className={styles.label}>Enter New Text:</label>
          <textarea
            id="newText"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className={styles.textInput}
            rows={4}
            required
          />
          <button type="submit" className={styles.submitButton}>
            Update Text
          </button>
        </form>

        <div className={styles.currentText}>
          <h2 className={styles.sectionTitle}>Current Text:</h2>
          <p className={styles.textContent}>{currentText || 'No text available'}</p>
          <a href="/current_text.txt" className={styles.downloadLink} download>
            Download Current Text
          </a>
        </div>

        <div className={styles.history}>
          <h2 className={styles.sectionTitle}>Text History:</h2>
          <ul className={styles.historyList}>
            {textHistory.length > 0 ? (
              textHistory.map((item, index) => (
                <li key={index} className={styles.historyItem}>
                  {item}
                </li>
              ))
            ) : (
              <li className={styles.historyItem}>No history available</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
