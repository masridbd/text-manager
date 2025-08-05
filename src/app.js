document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Initialize storage
    if (!localStorage.getItem('textHistory')) {
        localStorage.setItem('textHistory', JSON.stringify([]));
        localStorage.setItem('currentText', 'Welcome! Start by entering new text');
    }

    // PIN verification
    if (!sessionStorage.getItem('authenticated')) {
        renderLogin();
    } else {
        renderDashboard();
    }

    function renderLogin() {
        app.innerHTML = `
            <div class="login-card">
                <div class="logo">
                    <i class="fas fa-lock"></i>
                    <h1>Secure Text Manager</h1>
                </div>
                <form id="login-form">
                    <div class="input-group">
                        <i class="fas fa-key"></i>
                        <input 
                            type="password" 
                            placeholder="Enter PIN" 
                            autocomplete="off"
                            required
                        >
                    </div>
                    <button type="submit">Continue <i class="fas fa-arrow-right"></i></button>
                </form>
                <div id="error" class="error"></div>
                <div class="hint">Hint: PIN is 234432</div>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const pin = e.target.querySelector('input').value;
            if (pin === '234432') {
                sessionStorage.setItem('authenticated', 'true');
                renderDashboard();
            } else {
                const errorEl = document.getElementById('error');
                errorEl.textContent = 'Invalid PIN. Try again.';
                errorEl.classList.add('shake');
                setTimeout(() => errorEl.classList.remove('shake'), 500);
            }
        });
    }

    function renderDashboard() {
        const currentText = localStorage.getItem('currentText');
        const history = JSON.parse(localStorage.getItem('textHistory'));

        app.innerHTML = `
            <div class="dashboard">
                <header>
                    <div class="logo">
                        <i class="fas fa-file-alt"></i>
                        <h1>Text Manager</h1>
                    </div>
                    <button id="logout">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </header>
                
                <form id="text-form">
                    <label for="new-text">
                        <i class="fas fa-edit"></i> Enter New Text:
                    </label>
                    <div class="input-group">
                        <input 
                            type="text" 
                            id="new-text" 
                            placeholder="Type something new..."
                            required
                        >
                        <button type="submit">Update <i class="fas fa-paper-plane"></i></button>
                    </div>
                </form>
                
                <section class="current-section">
                    <h2><i class="fas fa-bookmark"></i> Current Text</h2>
                    <div class="card current-text">${currentText}</div>
                </section>
                
                <section class="history-section">
                    <div class="section-header">
                        <h2><i class="fas fa-history"></i> Text History</h2>
                        <button id="clear-history">Clear</button>
                    </div>
                    <div class="history">
                        ${history.length > 0 ? 
                            history.map(entry => `
                                <div class="history-entry">
                                    <div class="entry-header">
                                        <time>${new Date(entry.timestamp).toLocaleString()}</time>
                                        <button class="restore-btn" data-text="${entry.text}">
                                            <i class="fas fa-undo"></i>
                                        </button>
                                    </div>
                                    <p>${entry.text}</p>
                                </div>
                            `).reverse().join('') 
                            : '<div class="empty-state">No history yet. Make your first update!</div>'}
                    </div>
                </section>
                
                <div class="info">
                    <a href="/api/current-text" target="_blank">
                        <i class="fas fa-file-download"></i> Download current_text.txt
                    </a>
                </div>
            </div>
        `;

        // Update text
        document.getElementById('text-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newText = document.getElementById('new-text').value;
            
            // Update current text
            localStorage.setItem('currentText', newText);
            
            // Update history
            const history = JSON.parse(localStorage.getItem('textHistory'));
            history.push({
                text: newText,
                timestamp: Date.now()
            });
            localStorage.setItem('textHistory', JSON.stringify(history));
            
            // Re-render
            renderDashboard();
        });

        // Logout
        document.getElementById('logout').addEventListener('click', () => {
            sessionStorage.removeItem('authenticated');
            renderLogin();
        });

        // Clear history
        document.getElementById('clear-history')?.addEventListener('click', () => {
            localStorage.setItem('textHistory', JSON.stringify([]));
            renderDashboard();
        });

        // Restore text
        document.querySelectorAll('.restore-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('new-text').value = btn.dataset.text;
                document.getElementById('new-text').focus();
            });
        });
    }
});
