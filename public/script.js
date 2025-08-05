function checkPIN() {
  const pin = document.getElementById("pinInput").value;
  if (pin === "234432") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    fetchData();
  } else {
    document.getElementById("loginError").innerText = "Incorrect PIN!";
  }
}

function fetchData() {
  fetch("/api/current")
    .then(res => res.json())
    .then(data => {
      document.getElementById("currentText").innerText = data.text;
    });

  fetch("/api/history")
    .then(res => res.json())
    .then(history => {
      const list = document.getElementById("textHistory");
      list.innerHTML = "";
      history.forEach(t => {
        const li = document.createElement("li");
        li.innerText = t;
        list.appendChild(li);
      });
    });
}

function submitText() {
  const text = document.getElementById("newText").value.trim();
  if (!text) return;

  fetch("/api/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("newText").value = "";
    fetchData();
  });
}
