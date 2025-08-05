
async function submitPIN() {
  const pin = document.getElementById('pin').value;
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin })
  });
  const data = await res.json();
  if (data.success) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    loadText();
  } else {
    document.getElementById('login-error').innerText = 'Incorrect PIN';
  }
}

async function submitText() {
  const newText = document.getElementById('newText').value;
  await fetch('/api/updateText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  });
  document.getElementById('newText').value = '';
  loadText();
}

async function loadText() {
  const current = await fetch('/api/getText').then(res => res.json());
  const history = await fetch('/api/getHistory').then(res => res.json());

  document.getElementById('currentText').innerText = current.text || "(empty)";
  const list = document.getElementById('textHistory');
  list.innerHTML = '';
  history.history.forEach(entry => {
    const li = document.createElement('li');
    li.innerText = entry;
    list.appendChild(li);
  });
}
