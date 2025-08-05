import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const CORRECT_PIN = "1234"; // Change this to your desired PIN

// In-memory storage (for demo purposes - will reset on server restart)
let memoryCurrentText = '';
let memoryTextHistory = [];

export default function Home() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [newText, setNewText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [textHistory, setTextHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authenticated) {
      // Initialize with in-memory values
      setCurrentText(memoryCurrentText || 'No text available');
      setTextHistory(memoryTextHistory || []);
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
      // Update in-memory storage
      if (memoryCurrentText) {
        memoryTextHistory.unshift(memoryCurrentText);
      }
      memoryCurrentText = newText;
      
      // Keep only last 10 history items
      if (memoryTextHistory.length > 10) {
        memoryTextHistory = memoryTextHistory.slice(0, 10);
      }

      // Update state
      setCurrentText(newText);
      setTextHistory([...memoryTextHistory]);
      setNewText('');
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
          <p className={styles.textContent}>{currentText}</p>
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
                  }      });

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
